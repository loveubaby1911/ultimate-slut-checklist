import type { ICategories } from "~/typings/Categories"
import type { IDifficulties } from "~/typings/Difficulties"
import type { IModes } from "~/typings/Modes"
import type { ITags } from "~/typings/Tags"
import type { ITask } from "~/typings/Tasks"

export const categories:ICategories = {
  misc: "Sex and miscellaneous",
  oral: "Oral",
  public: "Public (Outside your house, somewhere people could be)",
  group: "Group sex",
  hotwife: "Hotwife",
  swinging: "Swinging"
}

export const modes:IModes = {
  monogamous: {name: "Monogamous", level: 1},
  swinger: {name: "Swinger", level: 2},
  single: {name: "Single", level: 3},
  hotwife: {name: "Hotwife", level: 4},
}

export const tags:ITags = {
  public: "Public",
  bi: "Bisexual",
  exposition: "Exposition"
}

export const difficulties:IDifficulties = {
  easy: {name: "Easy", level: 1},
  medium: {name: "Medium", level: 2},
  hard: {name: "Hard", level: 3},
  extreme: {name: "Extreme", level: 4}
}

export const tasks:ITask[] = [
  // Misc
  {
    name: "Gave a striptease",
    points: 1,
    category: categories.misc,
    mode: modes.monogamous.level,
    difficulty: difficulties.easy.level,
  },
  {
    name: "Gave a boobjob",
    points: 1,
    category: categories.misc,
    mode: modes.monogamous.level,
    difficulty: difficulties.easy.level,
  },
  {
    name: "Gave a handjob",
    points: 1,
    category: categories.misc,
    mode: modes.monogamous.level,
    difficulty: difficulties.easy.level,
  },

  // Oral
  {
    name: "Gave a blowjob",
    points: 1,
    category: categories.oral,
    mode: modes.monogamous.level,
    difficulty: difficulties.easy.level,
  },
  {
    name: "Licked balls",
    points: 1,
    category: categories.oral,
    mode: modes.monogamous.level,
    difficulty: difficulties.easy.level,
  },
  {
    name: "Made a guy cum only from blowjob",
    points: 2,
    category: categories.oral,
    mode: modes.monogamous.level,
    difficulty: difficulties.easy.level,
  },
  {
    name: "Gave a blowjob a day for one month",
    points: 5,
    category: categories.oral,
    mode: modes.monogamous.level,
    difficulty: difficulties.medium.level,
  },
  {
    name: "Deepthroated a total time of 1 hour in a day",
    points: 3,
    category: categories.oral,
    mode: modes.monogamous.level,
    difficulty: difficulties.hard.level,
  },

  // Public
  {
    name: "Flashed boobs in public",
    points: 2,
    category: categories.public,
    mode: modes.monogamous.level,
    difficulty: difficulties.easy.level,
    tags: [tags.public]
  },
  {
    name: "Got naked in public",
    points: 3,
    category: categories.public,
    mode: modes.monogamous.level,
    difficulty: difficulties.hard.level,
    tags: [tags.public]
  },

  // Group sex
  {
    name: "Fucked 2+ guys at the same time",
    points: 2,
    category: categories.group,
    mode: modes.single.level,
    difficulty: difficulties.medium.level
  },
  {
    name: "Got every hole filled",
    points: 3,
    category: categories.group,
    mode: modes.single.level,
    difficulty: difficulties.hard.level,
  },
  {
    name: "Fucked 10+ guys at once",
    points: 10,
    category: categories.group,
    mode: modes.single.level,
    difficulty: difficulties.extreme.level,
  },

  // Hotwife/Sharing
  {
    name: "Went to gloryhole with husband",
    points: 2,
    category: categories.hotwife,
    mode: modes.hotwife.level,
    difficulty: difficulties.easy.level,
  },

  // Swinging
  {
    name: "Gave handjob to another man",
    points: 2,
    category: categories.swinging,
    mode: modes.swinger.level,
    difficulty: difficulties.easy.level,
  },
]