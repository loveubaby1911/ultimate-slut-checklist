<script setup lang="ts">
import {watch} from "vue";

import type { ICategories } from "~/typings/Categories"
import type { ITags } from "~/typings/Tags"
import type { ITask } from "~/typings/Tasks"
import { categories, modes, tags, difficulties, tasks } from "../helpers/checklistData";

useHead({
  title: 'Ultimate slut checklist',
  meta: [
    { name: 'description', content: 'Ultimate slut checklist is THE checklist for everything sexual. Find out how much of a slut you are!' }
  ],
});

const img = useImage();

const backgroundStyles = computed(() => {
  const imgUrl = img('/images/myImage.webp', { width: 1920 })
  return { backgroundImage: `url('${imgUrl}')` }
});

const getTasks = (category?: string) => {
  if (category == null) {
    return myTasks.value?.filter(
      x => (
        x.mode <= options.mode 
        && x.difficulty <= options.difficulty 
        && options.tagsToExclude.every((item:string) => !x.tags?.includes(item))
      )
    );
  }

  return myTasks.value?.filter(
    x => (
      x.category == category 
      && x.mode <= options.mode 
      && x.difficulty <= options.difficulty 
      && options.tagsToExclude.every((item:string) => !x.tags?.includes(item))
    )
  );
};

const getCheckedTasksAmount = (category?: string) => getTasks(category).filter(x => checkedTasks.value.includes(x.name)).length;

const getPoints = (category?: string) => {
  let count = 0;
  getTasks(category).filter(x => checkedTasks.value.includes(x.name)).forEach(x => {
    count += x.points
  });
  return count;
};

const getMaxAvailablePoints = (category?: string) => {
  let count = 0;
  getTasks(category).forEach(x => {
    count += x.points
  });
  return count;
};

const getLocalStorageOptions = () => {
  const localOptions = localStorage.getItem("options")
  return localOptions ? JSON.parse(localOptions) : null;
};

const getLocalStorageCheckedTasks = () => {
  const localCheckedTasks = localStorage.getItem("checkedTasks")
  return localCheckedTasks ? JSON.parse(localCheckedTasks) : null;
};

// Options
const defaultOptions = {
  mode: modes.hotwife.level,
  difficulty: difficulties.extreme.level,
  tagsToExclude: []
}
const options = reactive(getLocalStorageOptions() || defaultOptions);
const tagsToExclude = ref(getLocalStorageOptions()?.tagsToExclude || []);

// categories
const myCategories = ref<ICategories | null>(null);
const myTasks = ref<ITask[]>([]);
const myTags = ref<ITags | null>(null)

myCategories.value = categories;
myTasks.value = tasks;
myTags.value = tags;

// Checked elements
const checkedTasks = ref(getLocalStorageCheckedTasks() || [])


watch([options, tagsToExclude], ([newOptions, newTagsToExclude]) => {
  options.tagsToExclude = tagsToExclude.value;
  localStorage.setItem("options", JSON.stringify(newOptions));
});

watch(checkedTasks, (newCheckedTasks) => {
  localStorage.setItem("checkedTasks", JSON.stringify(newCheckedTasks));
});
</script>

<template>
    <div class="home">
        <div class="wrapper">
          <h1>Ultimate Slut Checklist</h1>
          <div class="row">
            <label for="">Mode</label>
            <select name="" id="" v-model="options.mode">
              <option :value="modes.monogamous.level">{{ modes.monogamous.name }}</option>
              <option :value="modes.swinger.level">{{ modes.swinger.name }}</option>
              <option :value="modes.single.level">{{ modes.single.name }}</option>
              <option :value="modes.hotwife.level">{{ modes.hotwife.name }}</option>
            </select>
          </div>

          <div class="row">
            <label for="">Difficulty</label>
            <select name="" id="" v-model="options.difficulty">
              <option :value="difficulties.easy.level">{{ difficulties.easy.name }}</option>
              <option :value="difficulties.medium.level">{{ difficulties.medium.name }}</option>
              <option :value="difficulties.hard.level">{{ difficulties.hard.name }}</option>
              <option :value="difficulties.extreme.level">{{ difficulties.extreme.name }}</option>
            </select>
          </div>

          <fieldset>
            <legend>Type of tasks to exclude</legend>

            <div v-for="tag in myTags">
              <input type="checkbox" :value="tag" v-model="tagsToExclude" :id="tag">
              <label :for="tag">{{ tag }}</label>
            </div>
          </fieldset>

          <h2>Tasks completed: {{ getCheckedTasksAmount() }} / {{ getTasks()?.length }}</h2>
          <h2>Points: {{ getPoints() }} / {{ getMaxAvailablePoints() }}</h2>
          <div class="masonryContainer">
            <template v-for="category in myCategories">
              <template v-if="getTasks(category).length > 0">
                <div :class="{'completed': (getCheckedTasksAmount(category) >= getTasks(category).length)}" :key="category">
                  <div class="titleContainer">
                    <h2>{{ category }}</h2>
                    <div class="amount">{{ getCheckedTasksAmount(category) }} / {{ getTasks(category).length }}</div>
                    <div class="points">
                      Points: {{ getPoints(category) }} / {{ getMaxAvailablePoints(category) }}
                    </div>
                  </div>
                  <div v-for="item in getTasks(category)" :key="item.name">
                    <input type="checkbox" v-model="checkedTasks" :id="item.name" :value="item.name" />
                    <label :for="item.name">{{ item.name }}</label>
                  </div>
                </div>
              </template>
            </template>
          </div>
        </div>
    </div>
</template>

<style lang="scss">
.masonryContainer {
  --gap: 10px;
  column-count: 2;
  column-gap: var(--gap);

  > div {
    // margin: 0;
    // display: grid;
    // grid-template-rows: 1fr auto;
    margin-bottom: var(--gap);
    break-inside: avoid;
  }
}
</style>