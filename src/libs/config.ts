export const COLORS = [
  "#0B0B0B",
  "#5A5A5A",
  "#0F52BA",
  "#FFFFFF",
  "#C0C0C0",
  "#29B6F6",
  "#0F7A2A",
  "#8B0000",
  "#8B4513",
  "#1DB954",
  "#FF1E1E",
  "#FF8C1A",
  "#B87333",
  "#8E004D",
  "#C06060",
  "#FFD700",
  "#FF1493",
  "#FFB6C1",
] as const

export const TOOLS = {
  BRUSH: 1,
  ERASER: 2,
  BUCKET: 3
} as const

export const GRID_PROPERTIES = {
  WIDTH: 2,
  BORDER_COLOR: '#434E52',
} as const

export const EDITOR_DEF_CONFIG = {
  ROWS: 10,
  COLS: 10,
  CELL_SIZE: 50
} as const
