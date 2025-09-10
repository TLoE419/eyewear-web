# Cloudflare 部署實時資料更新方案

## 🚀 部署挑戰

在 Cloudflare Pages 上部署時，由於是靜態託管，無法使用內存存儲。需要外部資料存儲解決方案。

## 💡 解決方案選項

### 1. Cloudflare KV (推薦)

- **優點**: 與 Cloudflare 生態系統完美整合
- **缺點**: 有使用限制和成本
- **適用**: 中小型應用

### 2. 外部 API 服務

- **優點**: 靈活、功能完整
- **缺點**: 需要額外服務
- **適用**: 大型應用

### 3. 混合方案

- **優點**: 平衡成本和功能
- **缺點**: 架構複雜
- **適用**: 成長型應用

## 🔧 方案一：Cloudflare KV 存儲

### 設置步驟

1. **安裝 Cloudflare Workers 依賴**

```bash
npm install @cloudflare/workers-types wrangler
```

2. **配置 wrangler.toml**

```toml
name = "eyewear-admin"
main = "src/index.js"
compatibility_date = "2023-05-18"

[[kv_namespaces]]
binding = "ADMIN_DATA"
id = "your-kv-namespace-id"
```

3. **創建 KV 數據提供者**

```typescript
// src/lib/cloudflareDataProvider.ts
import { DataProvider } from "react-admin";

export const createCloudflareDataProvider = (kv: KVNamespace): DataProvider => {
  return {
    getList: async (resource, params) => {
      const data = (await kv.get(`${resource}:list`, "json")) || [];
      return { data, total: data.length };
    },

    getOne: async (resource, params) => {
      const data = await kv.get(`${resource}:${params.id}`, "json");
      if (!data) throw new Error("Not found");
      return { data };
    },

    create: async (resource, params) => {
      const newId = Date.now().toString();
      const newRecord = { ...params.data, id: newId };

      // 更新單個記錄
      await kv.put(`${resource}:${newId}`, JSON.stringify(newRecord));

      // 更新列表
      const list = (await kv.get(`${resource}:list`, "json")) || [];
      list.push(newRecord);
      await kv.put(`${resource}:list`, JSON.stringify(list));

      return { data: newRecord };
    },

    update: async (resource, params) => {
      const updatedRecord = { ...params.data, id: params.id };

      // 更新單個記錄
      await kv.put(`${resource}:${params.id}`, JSON.stringify(updatedRecord));

      // 更新列表
      const list = (await kv.get(`${resource}:list`, "json")) || [];
      const index = list.findIndex((item: any) => item.id === params.id);
      if (index !== -1) {
        list[index] = updatedRecord;
        await kv.put(`${resource}:list`, JSON.stringify(list));
      }

      return { data: updatedRecord };
    },

    delete: async (resource, params) => {
      // 刪除單個記錄
      await kv.delete(`${resource}:${params.id}`);

      // 更新列表
      const list = (await kv.get(`${resource}:list`, "json")) || [];
      const filteredList = list.filter((item: any) => item.id !== params.id);
      await kv.put(`${resource}:list`, JSON.stringify(filteredList));

      return { data: { id: params.id } };
    },

    // 其他方法...
  };
};
```

## 🔧 方案二：外部 API 服務

### 選項 A: Supabase (推薦)

```typescript
// src/lib/supabaseDataProvider.ts
import { createClient } from "@supabase/supabase-js";
import { DataProvider } from "react-admin";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const supabaseDataProvider: DataProvider = {
  getList: async (resource, params) => {
    const { data, error } = await supabase.from(resource).select("*");

    if (error) throw error;
    return { data: data || [], total: data?.length || 0 };
  },

  getOne: async (resource, params) => {
    const { data, error } = await supabase
      .from(resource)
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) throw error;
    return { data };
  },

  create: async (resource, params) => {
    const { data, error } = await supabase
      .from(resource)
      .insert([params.data])
      .select()
      .single();

    if (error) throw error;
    return { data };
  },

  update: async (resource, params) => {
    const { data, error } = await supabase
      .from(resource)
      .update(params.data)
      .eq("id", params.id)
      .select()
      .single();

    if (error) throw error;
    return { data };
  },

  delete: async (resource, params) => {
    const { error } = await supabase
      .from(resource)
      .delete()
      .eq("id", params.id);

    if (error) throw error;
    return { data: { id: params.id } };
  },

  // 其他方法...
};
```

### 選項 B: Firebase Firestore

```typescript
// src/lib/firebaseDataProvider.ts
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { DataProvider } from "react-admin";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const firebaseDataProvider: DataProvider = {
  getList: async (resource, params) => {
    const querySnapshot = await getDocs(collection(db, resource));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { data, total: data.length };
  },

  // 其他方法實現...
};
```

## 🔧 方案三：混合方案 (推薦用於生產)

### 架構設計

```
前端 (Cloudflare Pages)
    ↓
API Gateway (Cloudflare Workers)
    ↓
資料庫 (PlanetScale/Supabase)
    ↓
CDN 快取 (Cloudflare)
```

### 實現步驟

1. **設置環境變數**

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://your-api.your-domain.workers.dev
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key
```

2. **創建 API 代理**

```typescript
// src/lib/apiDataProvider.ts
import { DataProvider } from "react-admin";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const apiDataProvider: DataProvider = {
  getList: async (resource, params) => {
    const response = await fetch(`${API_URL}/${resource}`);
    const data = await response.json();
    return { data, total: data.length };
  },

  getOne: async (resource, params) => {
    const response = await fetch(`${API_URL}/${resource}/${params.id}`);
    const data = await response.json();
    return { data };
  },

  create: async (resource, params) => {
    const response = await fetch(`${API_URL}/${resource}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params.data),
    });
    const data = await response.json();
    return { data };
  },

  update: async (resource, params) => {
    const response = await fetch(`${API_URL}/${resource}/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params.data),
    });
    const data = await response.json();
    return { data };
  },

  delete: async (resource, params) => {
    await fetch(`${API_URL}/${resource}/${params.id}`, {
      method: "DELETE",
    });
    return { data: { id: params.id } };
  },

  // 其他方法...
};
```

## 🚀 部署指南

### Cloudflare Pages 部署

1. **準備部署配置**

```json
// package.json
{
  "scripts": {
    "build": "next build",
    "deploy": "wrangler pages deploy out"
  }
}
```

2. **設置環境變數**
   在 Cloudflare Pages 控制台設置：

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **部署命令**

```bash
npm run build
npm run deploy
```

### 資料初始化

1. **創建初始化腳本**

```typescript
// scripts/initData.ts
import { dataStore } from "../src/lib/dataStore";

async function initializeData() {
  // 將初始資料上傳到選擇的存儲方案
  const products = dataStore.products.getAll();
  const lenses = dataStore.lenses.getAll();

  // 上傳到 Supabase/Firebase/KV
  // ...
}

initializeData();
```

## 💰 成本比較

| 方案          | 月成本 | 功能   | 擴展性 |
| ------------- | ------ | ------ | ------ |
| Cloudflare KV | $5+    | 基礎   | 中等   |
| Supabase      | $25+   | 完整   | 高     |
| Firebase      | $25+   | 完整   | 高     |
| 自建 API      | $10+   | 自定義 | 高     |

## 🎯 推薦方案

### 開發階段

- 使用本地內存存儲（當前方案）

### 測試階段

- 使用 Supabase 免費方案

### 生產階段

- 使用 Supabase Pro + Cloudflare Pages
- 或自建 API + 資料庫

## 📋 下一步行動

1. 選擇資料存儲方案
2. 設置外部服務
3. 更新 dataProvider
4. 測試資料同步
5. 部署到 Cloudflare

需要我幫您實現哪個方案？
