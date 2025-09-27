// 照片管理相關的 React Hooks

import { useState, useEffect, useCallback } from "react";
import { Photo, PhotoCategory, PhotoUpload } from "@/lib/photoManagement";

// API 基礎 URL - 使用本地代理 API
const API_BASE_URL = "";

// 調試信息
console.log("API_BASE_URL:", API_BASE_URL);
console.log(
  "NEXT_PUBLIC_ADMIN_API_URL:",
  process.env.NEXT_PUBLIC_ADMIN_API_URL
);

// API 端點
const PHOTO_API_ENDPOINTS = {
  GET_PHOTOS: `${API_BASE_URL}/api/photos`,
  GET_PHOTOS_BY_CATEGORY: `${API_BASE_URL}/api/photos/category`,
  UPLOAD_PHOTO: `${API_BASE_URL}/api/photos/upload`,
  UPDATE_PHOTO: `${API_BASE_URL}/api/photos`,
  DELETE_PHOTO: `${API_BASE_URL}/api/photos`,
} as const;

// 獲取所有照片
export const usePhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await fetch(PHOTO_API_ENDPOINTS.GET_PHOTOS);
        if (!response.ok) {
          throw new Error("Failed to fetch photos");
        }
        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const refetch = useCallback(() => {
    window.location.reload();
  }, []);

  return { photos, loading, error, refetch };
};

// 根據類別獲取照片
export const usePhotosByCategory = (category: PhotoCategory) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      setError(null);

      // 啟用 API 調用以獲取資料庫的最新資料
      const enableAPI = true;

      if (!enableAPI) {
        // 如果禁用 API，直接使用預設資料
        setTimeout(() => {
          setPhotos(getDefaultPhotos(category));
          setLoading(false);
          setError(null);
        }, 100);
        return;
      }

      try {
        const url = `${PHOTO_API_ENDPOINTS.GET_PHOTOS_BY_CATEGORY}/${category}`;
        console.log(`🔍 嘗試獲取 ${category} 類別的照片資料...`);
        console.log(`📡 API URL: ${url}`);

        const response = await fetch(url, {
          cache: "no-cache",
          headers: {
            "Cache-Control": "no-cache",
          },
        });

        console.log(`📊 API 回應狀態: ${response.status}`);

        if (!response.ok) {
          throw new Error(`API 返回錯誤: ${response.status}`);
        }

        const data = await response.json();
        console.log(`✅ 成功獲取 ${category} 類別資料:`, data.length, "張照片");
        console.log(`📝 資料內容:`, data);
        setPhotos(data);
      } catch (err) {
        console.error(`❌ ${category} 類別 API 調用失敗:`, err);
        setError(err instanceof Error ? err.message : "Unknown error");
        console.log(`🔄 使用預設資料代替`);
        // 如果API失敗，使用預設照片
        setPhotos(getDefaultPhotos(category));
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [category]);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${PHOTO_API_ENDPOINTS.GET_PHOTOS_BY_CATEGORY}/${category}`,
        {
          cache: "no-cache",
          headers: {
            "Cache-Control": "no-cache",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch photos for category: ${category}`);
      }
      const data = await response.json();
      setPhotos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setPhotos(getDefaultPhotos(category));
    } finally {
      setLoading(false);
    }
  }, [category]);

  return { photos, loading, error, refetch };
};

// 上傳照片
export const usePhotoUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadPhoto = async (photoData: PhotoUpload, file: File) => {
    try {
      setUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", photoData.category);
      if (photoData.title) formData.append("title", photoData.title);
      if (photoData.subtitle) formData.append("subtitle", photoData.subtitle);
      if (photoData.文字欄1) formData.append("文字欄1", photoData.文字欄1);
      if (photoData.文字欄2) formData.append("文字欄2", photoData.文字欄2);
      if (photoData.display_order)
        formData.append("display_order", photoData.display_order.toString());
      if (photoData.is_active !== undefined)
        formData.append("is_active", photoData.is_active.toString());

      const response = await fetch(PHOTO_API_ENDPOINTS.UPLOAD_PHOTO, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload photo");
      }

      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      throw err;
    } finally {
      setUploading(false);
    }
  };

  return { uploadPhoto, uploading, error };
};

// 更新照片
export const usePhotoUpdate = () => {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updatePhoto = async (id: string, updates: Partial<Photo>) => {
    try {
      setUpdating(true);
      setError(null);

      const response = await fetch(
        `${PHOTO_API_ENDPOINTS.UPDATE_PHOTO}/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updates),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update photo");
      }

      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
      throw err;
    } finally {
      setUpdating(false);
    }
  };

  return { updatePhoto, updating, error };
};

// 刪除照片
export const usePhotoDelete = () => {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deletePhoto = async (id: string) => {
    try {
      setDeleting(true);
      setError(null);

      const response = await fetch(
        `${PHOTO_API_ENDPOINTS.DELETE_PHOTO}/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete photo");
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
      throw err;
    } finally {
      setDeleting(false);
    }
  };

  return { deletePhoto, deleting, error };
};

// 預設照片資料（當API不可用時使用）
const getDefaultPhotos = (category: PhotoCategory): Photo[] => {
  switch (category) {
    case PhotoCategory.HERO:
      return [
        {
          id: "hero-1",
          image_url: "/hero-1.jpg",
          category: PhotoCategory.HERO,
          title: "Hero Image 1",
          display_order: 1,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "hero-2",
          image_url: "/hero-2.jpg",
          category: PhotoCategory.HERO,
          title: "Hero Image 2",
          display_order: 2,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

    case PhotoCategory.IMAGE_SLIDER:
      return [
        {
          id: "slider-1",
          image_url: "/Slider_1.jpg",
          category: PhotoCategory.IMAGE_SLIDER,
          title: "精品眼鏡",
          subtitle: "時尚與品質的完美結合",
          文字欄1: "精品眼鏡", // 主要標題文字
          文字欄2: "時尚與品質的完美結合", // 副標題文字
          display_order: 1,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "slider-2",
          image_url: "/Slider_2.jpg",
          category: PhotoCategory.IMAGE_SLIDER,
          title: "專業服務",
          subtitle: "為您提供最優質的視覺體驗",
          文字欄1: "專業服務", // 主要標題文字
          文字欄2: "為您提供最優質的視覺體驗", // 副標題文字
          display_order: 2,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "slider-3",
          image_url: "/Slider_3.jpg",
          category: PhotoCategory.IMAGE_SLIDER,
          title: "實體店面",
          subtitle: "歡迎蒞臨參觀選購",
          文字欄1: "實體店面", // 主要標題文字
          文字欄2: "歡迎蒞臨參觀選購", // 副標題文字
          display_order: 3,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "slider-4",
          image_url: "/Slider_4.jpg",
          category: PhotoCategory.IMAGE_SLIDER,
          title: "專業驗光",
          subtitle: "精準驗光，舒適配戴",
          文字欄1: "專業驗光", // 主要標題文字
          文字欄2: "精準驗光，舒適配戴", // 副標題文字
          display_order: 4,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

    case PhotoCategory.NEWS_CAROUSEL:
      return [
        {
          id: "news-1",
          image_url: "/BVLGARI/BVLGARI_1.jpg",
          category: PhotoCategory.NEWS_CAROUSEL,
          title: "BVLGARI 眼鏡",
          文字欄1: "BVLGARI",
          display_order: 1,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "news-2",
          image_url: "/GUCCI/GUCCI_1.jpg",
          category: PhotoCategory.NEWS_CAROUSEL,
          title: "GUCCI 眼鏡",
          文字欄1: "GUCCI",
          display_order: 2,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "news-3",
          image_url: "/MONTBLANC/MONTBLANC_1.jpg",
          category: PhotoCategory.NEWS_CAROUSEL,
          title: "MONTBLANC 眼鏡",
          文字欄1: "MONTBLANC",
          display_order: 3,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "news-4",
          image_url: "/Ray.Ban/RayBan_1.jpg",
          category: PhotoCategory.NEWS_CAROUSEL,
          title: "Ray-Ban 眼鏡",
          文字欄1: "Ray-Ban",
          display_order: 4,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "news-5",
          image_url: "/999.9/999.9_1.jpg",
          category: PhotoCategory.NEWS_CAROUSEL,
          title: "999.9 眼鏡",
          文字欄1: "999.9",
          display_order: 5,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

    case PhotoCategory.BRAND_LOGO:
      // 返回 20 個預設品牌 Logo
      const baseLogos = [
        { name: "Ray-Ban", file: "rayban.jpg" },
        { name: "LINDBERG", file: "lindberg.jpg" },
        { name: "9999", file: "9999.jpg" },
        { name: "BVLGARI", file: "bvlgari.jpg" },
        { name: "GUCCI", file: "gucci.jpg" },
        { name: "MONTBLANC", file: "montblanc.jpg" },
      ];

      return Array.from({ length: 20 }, (_, index) => ({
        id: `logo-${index + 1}`,
        image_url: `/Logo/${baseLogos[index % baseLogos.length].file}`,
        category: PhotoCategory.BRAND_LOGO,
        文字欄1: baseLogos[index % baseLogos.length].name,
        display_order: index + 1,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));

    default:
      return [];
  }
};
