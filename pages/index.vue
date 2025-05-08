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
  mode: modes.single.level,
  difficulty: difficulties.extreme.level,
  tagsToExclude: []
};
const options = reactive(getLocalStorageOptions() || defaultOptions);
const tagsToExclude = ref(getLocalStorageOptions()?.tagsToExclude || []);

// categories
const myCategories = ref<ICategories | null>(null);
const myTasks = ref<ITask[]>([]);
const myTags = ref<ITags | null>(null);

myCategories.value = categories;
myTasks.value = tasks;
myTags.value = tags;

// Checked elements
const checkedTasks = ref(getLocalStorageCheckedTasks() || []);

const settingsOpened = ref(false);

const toggleCheckAll = () => {
  const visibleTasks = getTasks().map(task => task.name);
  const allChecked = visibleTasks.every(name => checkedTasks.value.includes(name));

  if (allChecked) {
    // Uncheck all
    checkedTasks.value = checkedTasks.value.filter(name => !visibleTasks.includes(name));
  } else {
    // Check all visible tasks
    const newChecked = new Set(checkedTasks.value);
    visibleTasks.forEach(name => newChecked.add(name));
    checkedTasks.value = Array.from(newChecked);
  }

  localStorage.setItem("checkedTasks", JSON.stringify(checkedTasks.value));
};

watch([options, tagsToExclude], ([newOptions, newTagsToExclude]) => {
  options.tagsToExclude = tagsToExclude.value;
  localStorage.setItem("options", JSON.stringify(newOptions));
});

watch(checkedTasks, (newCheckedTasks) => {
  localStorage.setItem("checkedTasks", JSON.stringify(newCheckedTasks));
});

const allTasksChecked = computed(() => {
  const visibleTasks = getTasks().map(task => task.name);
  return visibleTasks.length > 0 && visibleTasks.every(name => checkedTasks.value.includes(name));
});
</script>

<template>
    <div class="home">
        <div class="wrapper">
          <div class="title-container wrap">
            <h1>Ultimate Slut Checklist</h1>
            <div class="settings-container">
              <button @click="toggleCheckAll()">
                {{ allTasksChecked ? 'Uncheck all' : 'Check all' }}
              </button>
              <button class="btn btn-simple" @click="settingsOpened = true">
                <svg width="32" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier"><path fill="currentColor" d="M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357.12 357.12 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a351.616 351.616 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357.12 357.12 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088-24.512 11.968a294.113 294.113 0 0 0-34.816 20.096l-22.656 15.36-116.224-25.088-65.28 113.152 79.68 88.192-1.92 27.136a293.12 293.12 0 0 0 0 40.192l1.92 27.136-79.808 88.192 65.344 113.152 116.224-25.024 22.656 15.296a294.113 294.113 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152 24.448-11.904a288.282 288.282 0 0 0 34.752-20.096l22.592-15.296 116.288 25.024 65.28-113.152-79.744-88.192 1.92-27.136a293.12 293.12 0 0 0 0-40.256l-1.92-27.136 79.808-88.128-65.344-113.152-116.288 24.96-22.592-15.232a287.616 287.616 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384 192 192 0 0 1 0-384zm0 64a128 128 0 1 0 0 256 128 128 0 0 0 0-256z"></path></g>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="title-container wrap">
            <h2>Tasks completed: {{ getCheckedTasksAmount() }} / {{ getTasks()?.length }}</h2>
            <h2>Points: {{ getPoints() }} / {{ getMaxAvailablePoints() }}</h2>
          </div>
        </div>

        <div class="masonry-container">
          <template v-for="category in myCategories">
            <template v-if="getTasks(category.name).length > 0">
              <div :class="['category', {'completed': (getCheckedTasksAmount(category.name) >= getTasks(category.name).length)}]" :key="category.name">
                <div class="title-container wrap">
                  <h2>{{ category.name }}</h2>
                  <div class="amount">{{ getCheckedTasksAmount(category.name) }} / {{ getTasks(category.name).length }}</div>
                  <p v-if="category.description">{{ category.description }}</p>
                </div>
                <div class="title-container">
                  Points: {{ getPoints(category.name) }} / {{ getMaxAvailablePoints(category.name) }}
                </div>
                <div v-for="item in getTasks(category.name)" :key="item.name" :class="['task', {checked: checkedTasks.includes(item.name)}]">
                  <label :for="item.name" class="checkbox-wrapper-19">
                    <input  type="checkbox" v-model="checkedTasks" :id="item.name" :value="item.name" />
                    <div class="check-box"></div>
                    <div class="checkbox-title">{{ item.name }}</div>
                  </label>

                  <div class="task-points">{{ item.points }} pts</div>
                </div>
              </div>
            </template>
          </template>
        </div>
    </div>

    <div @click.self="settingsOpened = false" :class="['popin', {'popin-opened': settingsOpened}]">
      <div class="popin-body">
        <div class="popin-title">
          <h2>Settings</h2>
          <button class="popin-close" @click="settingsOpened = false">X</button>
        </div>

        <div class="form">
            <div class="formRow">
              <label>Mode</label>
              <select name="" id="" v-model="options.mode">
                <option :value="modes.monogamous.level">{{ modes.monogamous.name }}</option>
                <option :value="modes.swinger.level">{{ modes.swinger.name }}</option>
                <option :value="modes.single.level">{{ modes.single.name }}</option>
              </select>
            </div>

            <div class="formRow">
              <label>Difficulty</label>
              <select name="" id="" v-model="options.difficulty">
                <option :value="difficulties.easy.level">{{ difficulties.easy.name }}</option>
                <option :value="difficulties.medium.level">{{ difficulties.medium.name }}</option>
                <option :value="difficulties.hard.level">{{ difficulties.hard.name }}</option>
                <option :value="difficulties.extreme.level">{{ difficulties.extreme.name }}</option>
              </select>
            </div>

            <div class="formRow checkbox-container">
              <label>Type of tasks to exclude</label>

              <div v-for="tag in myTags" class="checkbox-wrapper-9">
                <label :for="tag">
                  <input type="checkbox" class="tgl tgl-flat" :value="tag" v-model="tagsToExclude" :id="tag">
                  <div class="tgl-btn"></div>
                  <div class="checkbox-text">
                    {{ tag }}
                  </div>
                </label>
              </div>
            </div>
          </div>
      </div>
    </div>
</template>

<style lang="scss">
.home {
  padding-top: 32px;
}

.masonry-container {
  --gap: 32px;
  column-count: 4;
  column-gap: var(--gap);
  padding: 48px 16px;

  > div {
    // margin: 0;
    // display: grid;
    // grid-template-rows: 1fr auto;
    margin-bottom: var(--gap);
    break-inside: avoid;
  }
}

.task {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1em;
  font-size: 1.125em;

  &:not(:last-child) {
    margin-bottom: 1.5em;
  }

  .task-points {
    font-size: 0.88888888em;
    margin-top: 1px;
    flex-shrink: 0;
  }

  &.checked {
    .task-points {
      color: $blue;
    }
  }
}

.category {
  border: solid 2px $white;
  padding: 24px;
  transition: all 0.25s;

  &.completed {
    color: $blue;
    border-color: $blue;
  }
}

.amount {
  flex-shrink: 0;
}

.settings-container {
  display: flex;
  flex-wrap: nowrap;
  gap: 1em;
}

@media screen and (max-width: 1650px) {
  .masonry-container {
    column-count: 3;
  }
}

@media screen and (max-width: 1200px) {
  .masonry-container {
    column-count: 2;
  }
}

@media screen and (max-width: 767px) {
  .masonry-container {
    column-count: 1;
  }
}
</style>