
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      consultations: {
        Row: {
          created_at: string
          doctor_slug: string | null
          id: string
          messages: Json | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          doctor_slug?: string | null
          id?: string
          messages?: Json | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          doctor_slug?: string | null
          id?: string
          messages?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consultations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      goals: {
        Row: {
          created_at: string
          id: string
          progress: number
          target_date: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          progress?: number
          target_date?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          progress?: number
          target_date?: string | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active_ingredients: string[] | null
          affiliate_url: string | null
          id: string
          image_url: string | null
          marketplace: string | null
          name: string | null
          price: number | null
          rating: number | null
          scraped_at: string
          specialty: string | null
        }
        Insert: {
          active_ingredients?: string[] | null
          affiliate_url?: string | null
          id?: string
          image_url?: string | null
          marketplace?: string | null
          name?: string | null
          price?: number | null
          rating?: number | null
          scraped_at?: string
          specialty?: string | null
        }
        Update: {
          active_ingredients?: string[] | null
          affiliate_url?: string | null
          id?: string
          image_url?: string | null
          marketplace?: string | null
          name?: string | null
          price?: number | null
          rating?: number | null
          scraped_at?: string
          specialty?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          birthday: string | null
          consent: boolean
          full_name: string | null
          id: string
          lang: string
          skin_type: string | null
          theme: string
        }
        Insert: {
          birthday?: string | null
          consent?: boolean
          full_name?: string | null
          id: string
          lang?: string
          skin_type?: string | null
          theme?: string
        }
        Update: {
          birthday?: string | null
          consent?: boolean
          full_name?: string | null
          id?: string
          lang?: string
          skin_type?: string | null
          theme?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      purchases: {
        Row: {
          clicked_at: string
          id: string
          product_id: string | null
          user_id: string | null
        }
        Insert: {
          clicked_at?: string
          id?: string
          product_id?: string | null
          user_id?: string | null
        }
        Update: {
          clicked_at?: string
          id?: string
          product_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchases_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchases_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
