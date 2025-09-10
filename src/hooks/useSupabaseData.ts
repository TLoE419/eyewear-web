import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// 創建 Supabase 客戶端
const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase 環境變數未設置");
  }

  return createClient(supabaseUrl, supabaseKey);
};

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  description: string;
  inStock: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Lens {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  description: string;
  features: string[];
  specifications: {
    material: string;
    coating: string;
    thickness: string;
    transmission: string;
  };
  price: string;
  inStock: boolean;
  created_at?: string;
  updated_at?: string;
}

// 產品資料 Hook
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const supabase = createSupabaseClient();
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("id");

        if (error) throw error;

        // 處理欄位名稱轉換（instock -> inStock）
        const processedData = (data || []).map((item) => ({
          ...item,
          inStock: item.instock,
          instock: undefined,
        }));

        setProducts(processedData);
      } catch (err: unknown) {
        console.error("獲取產品資料失敗:", err);
        setError(err instanceof Error ? err.message : "未知錯誤");
        // 如果 Supabase 失敗，回退到靜態資料
        try {
          const staticData = await import("@/data/products.json");
          setProducts(staticData.default as Product[]);
        } catch (staticErr) {
          console.error("靜態資料也載入失敗:", staticErr);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}

// 鏡片資料 Hook
export function useLenses() {
  const [lenses, setLenses] = useState<Lens[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLenses = async () => {
      try {
        setLoading(true);
        setError(null);

        const supabase = createSupabaseClient();
        const { data, error } = await supabase
          .from("lenses")
          .select("*")
          .order("id");

        if (error) throw error;

        // 處理欄位名稱轉換（instock -> inStock）
        const processedData = (data || []).map((item) => ({
          ...item,
          inStock: item.instock,
          instock: undefined,
        }));

        setLenses(processedData);
      } catch (err: unknown) {
        console.error("獲取鏡片資料失敗:", err);
        setError(err instanceof Error ? err.message : "未知錯誤");
        // 如果 Supabase 失敗，回退到靜態資料
        try {
          const staticData = await import("@/data/lenses.json");
          setLenses(staticData.default as Lens[]);
        } catch (staticErr) {
          console.error("靜態資料也載入失敗:", staticErr);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLenses();
  }, []);

  return { lenses, loading, error };
}

// 單個產品資料 Hook
export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const supabase = createSupabaseClient();
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        // 處理欄位名稱轉換（instock -> inStock）
        const processedData = {
          ...data,
          inStock: data.instock,
          instock: undefined,
        };

        setProduct(processedData);
      } catch (err: unknown) {
        console.error("獲取產品資料失敗:", err);
        setError(err instanceof Error ? err.message : "未知錯誤");
        // 如果 Supabase 失敗，回退到靜態資料
        try {
          const staticData = await import("@/data/products.json");
          const foundProduct = staticData.default.find(
            (p: Product) => p.id === id
          );
          setProduct(foundProduct || null);
        } catch (staticErr) {
          console.error("靜態資料也載入失敗:", staticErr);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
}
