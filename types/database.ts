export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      addresses: {
        Row: {
          city: string;
          country: string;
          created_at: string;
          id: string;
          is_default: boolean;
          line_1: string;
          line_2: string | null;
          postal_code: string | null;
          profile_id: string;
          state: string | null;
          updated_at: string;
        };
        Insert: {
          city: string;
          country?: string;
          created_at?: string;
          id?: string;
          is_default?: boolean;
          line_1: string;
          line_2?: string | null;
          postal_code?: string | null;
          profile_id: string;
          state?: string | null;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["addresses"]["Insert"]>;
      };
      cart_items: {
        Row: {
          created_at: string;
          id: string;
          product_id: string;
          profile_id: string;
          quantity: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          product_id: string;
          profile_id: string;
          quantity?: number;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["cart_items"]["Insert"]>;
      };
      order_items: {
        Row: {
          created_at: string;
          id: string;
          order_id: string;
          product_id: string;
          product_name: string;
          quantity: number;
          unit_price: number;
        };
        Insert: {
          created_at?: string;
          id?: string;
          order_id: string;
          product_id: string;
          product_name: string;
          quantity: number;
          unit_price: number;
        };
        Update: Partial<Database["public"]["Tables"]["order_items"]["Insert"]>;
      };
      orders: {
        Row: {
          created_at: string;
          currency: string;
          email: string;
          id: string;
          notes: string | null;
          payment_provider: string | null;
          payment_reference: string | null;
          payment_status: "pending" | "paid" | "failed" | "refunded";
          profile_id: string | null;
          status: "pending" | "processing" | "fulfilled" | "cancelled";
          subtotal_amount: number;
          total_amount: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          currency?: string;
          email: string;
          id?: string;
          notes?: string | null;
          payment_provider?: string | null;
          payment_reference?: string | null;
          payment_status?: "pending" | "paid" | "failed" | "refunded";
          profile_id?: string | null;
          status?: "pending" | "processing" | "fulfilled" | "cancelled";
          subtotal_amount: number;
          total_amount: number;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["orders"]["Insert"]>;
      };
      product_images: {
        Row: {
          alt_text: string | null;
          created_at: string;
          id: string;
          image_url: string;
          is_primary: boolean;
          product_id: string;
          sort_order: number;
        };
        Insert: {
          alt_text?: string | null;
          created_at?: string;
          id?: string;
          image_url: string;
          is_primary?: boolean;
          product_id: string;
          sort_order?: number;
        };
        Update: Partial<Database["public"]["Tables"]["product_images"]["Insert"]>;
      };
      products: {
        Row: {
          category: string;
          created_at: string;
          description: string;
          id: string;
          image_url: string;
          is_active: boolean;
          name: string;
          price: number;
          rating: number;
          review_count: number;
          slug: string;
          stock: number;
          updated_at: string;
        };
        Insert: {
          category: string;
          created_at?: string;
          description: string;
          id?: string;
          image_url: string;
          is_active?: boolean;
          name: string;
          price: number;
          rating?: number;
          review_count?: number;
          slug: string;
          stock?: number;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
      };
      profiles: {
        Row: {
          created_at: string;
          email: string;
          first_name: string | null;
          id: string;
          is_admin: boolean;
          last_name: string | null;
          phone: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          first_name?: string | null;
          id: string;
          is_admin?: boolean;
          last_name?: string | null;
          phone?: string | null;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
    };
  };
};
