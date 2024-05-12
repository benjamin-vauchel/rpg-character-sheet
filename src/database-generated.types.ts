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
      armor: {
        Row: {
          defense: string | null
          encumbrance: string | null
          hard_points: string | null
          header: string | null
          id: number
          price: string | null
          rarity: string | null
          soak: string | null
          type: string | null
        }
        Insert: {
          defense?: string | null
          encumbrance?: string | null
          hard_points?: string | null
          header?: string | null
          id?: number
          price?: string | null
          rarity?: string | null
          soak?: string | null
          type?: string | null
        }
        Update: {
          defense?: string | null
          encumbrance?: string | null
          hard_points?: string | null
          header?: string | null
          id?: number
          price?: string | null
          rarity?: string | null
          soak?: string | null
          type?: string | null
        }
        Relationships: []
      }
      attachment: {
        Row: {
          encumbrance: string | null
          header: string | null
          hp_required: string | null
          id: number
          name: string | null
          price: string | null
          rarity: string | null
          works_on: string | null
        }
        Insert: {
          encumbrance?: string | null
          header?: string | null
          hp_required?: string | null
          id?: number
          name?: string | null
          price?: string | null
          rarity?: string | null
          works_on?: string | null
        }
        Update: {
          encumbrance?: string | null
          header?: string | null
          hp_required?: string | null
          id?: number
          name?: string | null
          price?: string | null
          rarity?: string | null
          works_on?: string | null
        }
        Relationships: []
      }
      career: {
        Row: {
          header: string
          id: string
          subheader: string
          type: string
        }
        Insert: {
          header: string
          id: string
          subheader: string
          type: string
        }
        Update: {
          header?: string
          id?: string
          subheader?: string
          type?: string
        }
        Relationships: []
      }
      career_bonus_skills: {
        Row: {
          bonus_skill: string
          career_id: string
          id: number
        }
        Insert: {
          bonus_skill: string
          career_id: string
          id?: number
        }
        Update: {
          bonus_skill?: string
          career_id?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_career_bonus_skills_career_id_fkey"
            columns: ["career_id"]
            isOneToOne: false
            referencedRelation: "career"
            referencedColumns: ["id"]
          },
        ]
      }
      career_skills: {
        Row: {
          career_id: string
          id: number
          skill: string
        }
        Insert: {
          career_id: string
          id?: number
          skill: string
        }
        Update: {
          career_id?: string
          id?: number
          skill?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_career_skills_career_id_fkey"
            columns: ["career_id"]
            isOneToOne: false
            referencedRelation: "career"
            referencedColumns: ["id"]
          },
        ]
      }
      career_talent_paths: {
        Row: {
          career_id: string
          id: number
          path_index: number
          path1: number | null
          path2: number | null
          path3: number | null
          path4: number | null
        }
        Insert: {
          career_id: string
          id?: number
          path_index: number
          path1?: number | null
          path2?: number | null
          path3?: number | null
          path4?: number | null
        }
        Update: {
          career_id?: string
          id?: number
          path_index?: number
          path1?: number | null
          path2?: number | null
          path3?: number | null
          path4?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_talent_paths_career_id_fkey"
            columns: ["career_id"]
            isOneToOne: false
            referencedRelation: "career"
            referencedColumns: ["id"]
          },
        ]
      }
      career_talents: {
        Row: {
          career_id: string
          id: number
          talent1: string
          talent2: string
          talent3: string
          talent4: string
        }
        Insert: {
          career_id: string
          id?: number
          talent1: string
          talent2: string
          talent3: string
          talent4: string
        }
        Update: {
          career_id?: string
          id?: number
          talent1?: string
          talent2?: string
          talent3?: string
          talent4?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_career_talents_career_id_fkey"
            columns: ["career_id"]
            isOneToOne: false
            referencedRelation: "career"
            referencedColumns: ["id"]
          },
        ]
      }
      character: {
        Row: {
          character_sheet_id: number
          created_at: string
          id: number
          name: string
        }
        Insert: {
          character_sheet_id: number
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          character_sheet_id?: number
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "character_character_sheet_id_fkey"
            columns: ["character_sheet_id"]
            isOneToOne: false
            referencedRelation: "character_sheet"
            referencedColumns: ["id"]
          },
        ]
      }
      character_armor: {
        Row: {
          armor_id: number
          character_id: number
          extra: Json | null
          id: number
        }
        Insert: {
          armor_id: number
          character_id: number
          extra?: Json | null
          id?: number
        }
        Update: {
          armor_id?: number
          character_id?: number
          extra?: Json | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_character_armor_armor_id_fkey"
            columns: ["armor_id"]
            isOneToOne: false
            referencedRelation: "armor"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_character_armor_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "character"
            referencedColumns: ["id"]
          },
        ]
      }
      character_attachment: {
        Row: {
          armor_id: number | null
          attachment_id: number
          character_id: number
          extra: Json | null
          id: number
          weapon_id: number | null
        }
        Insert: {
          armor_id?: number | null
          attachment_id: number
          character_id: number
          extra?: Json | null
          id?: number
          weapon_id?: number | null
        }
        Update: {
          armor_id?: number | null
          attachment_id?: number
          character_id?: number
          extra?: Json | null
          id?: number
          weapon_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_character_attachment_armor_id_fkey"
            columns: ["armor_id"]
            isOneToOne: false
            referencedRelation: "character_armor"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_character_attachment_attachment_id_fkey"
            columns: ["attachment_id"]
            isOneToOne: false
            referencedRelation: "attachment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_character_attachment_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "character"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_character_attachment_weapon_id_fkey"
            columns: ["weapon_id"]
            isOneToOne: false
            referencedRelation: "character_weapon"
            referencedColumns: ["id"]
          },
        ]
      }
      character_sheet: {
        Row: {
          created_at: string
          dashboards: Json
          id: number
          opened_at: string | null
          player_id: number
        }
        Insert: {
          created_at?: string
          dashboards?: Json
          id?: number
          opened_at?: string | null
          player_id: number
        }
        Update: {
          created_at?: string
          dashboards?: Json
          id?: number
          opened_at?: string | null
          player_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "character_sheet_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player"
            referencedColumns: ["id"]
          },
        ]
      }
      character_skill: {
        Row: {
          character_id: number
          dices: Json
          extra: Json | null
          id: number
          is_career: boolean
          rank: number
          skill_id: number
        }
        Insert: {
          character_id: number
          dices: Json
          extra?: Json | null
          id?: number
          is_career: boolean
          rank?: number
          skill_id: number
        }
        Update: {
          character_id?: number
          dices?: Json
          extra?: Json | null
          id?: number
          is_career?: boolean
          rank?: number
          skill_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_character_skill_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "character"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_character_skill_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skill"
            referencedColumns: ["id"]
          },
        ]
      }
      character_weapon: {
        Row: {
          character_id: number
          condition: number
          extra: Json | null
          id: number
          weapon_id: number
        }
        Insert: {
          character_id: number
          condition?: number
          extra?: Json | null
          id?: number
          weapon_id: number
        }
        Update: {
          character_id?: number
          condition?: number
          extra?: Json | null
          id?: number
          weapon_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_character_weapon_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "character"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_character_weapon_weapon_id_fkey"
            columns: ["weapon_id"]
            isOneToOne: false
            referencedRelation: "weapon"
            referencedColumns: ["Id"]
          },
        ]
      }
      player: {
        Row: {
          created_at: string
          id: number
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      skill: {
        Row: {
          characteristic: string
          id: number
          name: string
          type: string
        }
        Insert: {
          characteristic: string
          id?: number
          name: string
          type: string
        }
        Update: {
          characteristic?: string
          id?: number
          name?: string
          type?: string
        }
        Relationships: []
      }
      weapon: {
        Row: {
          crit: string | null
          dam: string | null
          encum: string | null
          header: string | null
          hp: string | null
          Id: number
          name: string
          price: string | null
          range: string | null
          rarity: string | null
          skill: string | null
          special: string | null
        }
        Insert: {
          crit?: string | null
          dam?: string | null
          encum?: string | null
          header?: string | null
          hp?: string | null
          Id?: number
          name: string
          price?: string | null
          range?: string | null
          rarity?: string | null
          skill?: string | null
          special?: string | null
        }
        Update: {
          crit?: string | null
          dam?: string | null
          encum?: string | null
          header?: string | null
          hp?: string | null
          Id?: number
          name?: string
          price?: string | null
          range?: string | null
          rarity?: string | null
          skill?: string | null
          special?: string | null
        }
        Relationships: []
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
