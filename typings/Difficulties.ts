export interface IDifficulty {
  name: string
  level: number
}

export interface IDifficulties {
  easy: IDifficulty
  medium: IDifficulty
  hard: IDifficulty
  extreme: IDifficulty
}