
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      tournaments: {
        Row: {
          id: string
          name: string
          created_at: string
          date: string
          location: string
          user_id: string | null
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
          date: string
          location: string
          user_id?: string | null
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
          date?: string
          location?: string
          user_id?: string | null
        }
      }
      players: {
        Row: {
          id: string
          tag: string
          name: string
          tournament_id: string
          created_at: string
          points: number
          points_scored: number
          points_conceded: number
          rank: number | null
        }
        Insert: {
          id?: string
          tag: string
          name: string
          tournament_id: string
          created_at?: string
          points?: number
          points_scored?: number
          points_conceded?: number
          rank?: number | null
        }
        Update: {
          id?: string
          tag?: string
          name?: string
          tournament_id?: string
          created_at?: string
          points?: number
          points_scored?: number
          points_conceded?: number
          rank?: number | null
        }
      }
      sessions: {
        Row: {
          id: string
          title: string
          time: string
          tournament_id: string
          created_at: string
          pause: string | null
        }
        Insert: {
          id?: string
          title: string
          time: string
          tournament_id: string
          created_at?: string
          pause?: string | null
        }
        Update: {
          id?: string
          title?: string
          time?: string
          tournament_id?: string
          created_at?: string
          pause?: string | null
        }
      }
      matches: {
        Row: {
          id: string
          session_id: string
          court: string
          team1_score: number | null
          team2_score: number | null
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          court: string
          team1_score?: number | null
          team2_score?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          court?: string
          team1_score?: number | null
          team2_score?: number | null
          created_at?: string
        }
      }
      match_players: {
        Row: {
          id: string
          match_id: string
          player_id: string
          team: 'team1' | 'team2'
          created_at: string
        }
        Insert: {
          id?: string
          match_id: string
          player_id: string
          team: 'team1' | 'team2'
          created_at?: string
        }
        Update: {
          id?: string
          match_id?: string
          player_id?: string
          team?: 'team1' | 'team2'
          created_at?: string
        }
      }
      finals: {
        Row: {
          id: string
          tournament_id: string
          type: 'champions' | 'europa' | 'conference'
          title: string
          time: string
          court: string
          team1_score: number | null
          team2_score: number | null
          created_at: string
        }
        Insert: {
          id?: string
          tournament_id: string
          type: 'champions' | 'europa' | 'conference'
          title: string
          time: string
          court: string
          team1_score?: number | null
          team2_score?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          tournament_id?: string
          type?: 'champions' | 'europa' | 'conference'
          title?: string
          time?: string
          court?: string
          team1_score?: number | null
          team2_score?: number | null
          created_at?: string
        }
      }
      final_players: {
        Row: {
          id: string
          final_id: string
          player_id: string
          team: 'team1' | 'team2'
          created_at: string
        }
        Insert: {
          id?: string
          final_id: string
          player_id: string
          team: 'team1' | 'team2'
          created_at?: string
        }
        Update: {
          id?: string
          final_id?: string
          player_id?: string
          team?: 'team1' | 'team2'
          created_at?: string
        }
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
