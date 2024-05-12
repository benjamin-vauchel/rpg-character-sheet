import { MergeDeep } from 'type-fest'
import { Database as DatabaseGenerated } from './database-generated.types'
import { Dashboard } from './types/dashboard'

export type Database = MergeDeep<
  DatabaseGenerated,
  {
    public: {
      Tables: {
        character_sheet: {
          Row: {
            dashboards: Dashboard[],
            character: Tables<'character'>[],
          },
          Update: {
            dashboards?: Dashboard[],
          }
        }
      }
    }
  }
>


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