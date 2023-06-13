<template>
  <div>
    <a-modal
      :closable="false"
      :maskClosable="false"
      dialogClass="modal-task"
      :footer="null"
      v-model="visibleModal"
      :title="null"
    >
      <div class="header-modal">
        <h4>Nouvelle Tache</h4>
      </div>
      <div class="content-modal">
        <a-form-model :model="formTask">
          <a-form-model-item label="Titre">
            <a-input v-model="formTask.title" />
          </a-form-model-item>
          <div class="row">
            <div class=""></div>
          </div>
          <a-form-model-item label="Type de tache">
            <a-radio-group
              class="d-flex justify-content-between icon-radio"
              v-model="formTask.category"
            >
              <a-radio
                v-for="category in categoryOptions"
                :key="category.value"
                :value="category.value"
              >
                {{ category.label }}
                <a-icon class="float-right" :type="category.icon" />
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item v-if="formTask.category == 'maintenance'" label="">
            <a-alert
              message="réserver pour la categorie maintenance"
              type="info"
            />
          </a-form-model-item>
          <div class="row">
            <div class="col-md-4">
              <a-form-model-item label="Type de bien">
                <a-select
                  :placeholder="'Unité'"
                  :allowClear="true"
                  @change="onChangeType($event)"
                  :showSearch="true"
                  v-model="formTask.owner.type"
                >
                  <a-select-option
                    v-for="type in ownerTypeOptions"
                    :key="type.value"
                    :value="type.value"
                  >
                    {{ type.label }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </div>
            <div class="col-md-8">
              <a-form-model-item label="Nom du bien">
                <a-select
                  :placeholder="'Sélectionner'"
                  :allowClear="true"
                  :loading="loadingbuildingsUnits"
                  :showSearch="true"
                  v-model="formTask.owner.name"
                >
                  <a-select-option
                    v-for="b in buildingsUnits"
                    :key="b.id"
                    :value="b.id"
                  >
                    {{ b.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </div>
          </div>
          <a-form-model-item label="Sous-taches">
            <div
              v-for="(subTask, counter) in formTask.checklist"
              v-bind:key="counter"
              class="row"
            >
              <div class="col-md-1">
                <a-checkbox v-model="formTask.checklist[counter].check">
                </a-checkbox>
              </div>
              <div class="col-md-8">
                <a-input
                  :placeholder="'Cirer le plancher'"
                  v-model="formTask.checklist[counter].value"
                />
              </div>
              <div class="col-md-3 text-right">
                <a-button
                  @click="deleteSubTask(counter)"
                  class="pr-0"
                  type="link"
                >
                  Supprimer
                </a-button>
              </div>
            </div>
            <div>
              <a-button
                @click="addSubTask()"
                icon="plus"
                class="pl-0"
                type="link"
              >
                Ajouter
              </a-button>
            </div>
          </a-form-model-item>
        </a-form-model>
      </div>
      <div class="row">
        <div class="col-md-12 text-right">
          <a-button @click="closeModalTask" class="btn-default">
            Réinitialiser
          </a-button>
          <a-button @click="saveTask" class="btn-primary ml-2">
            Enregistrer
          </a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script >
import Vue from "vue";
import { EventBus } from "~/store/event-bus";
import TaskService from "~/plugins/task.service";

export default Vue.extend({
  data() {
    return {
      visibleModal: false,
      loadingbuildingsUnits: false,
      categoryOptions: [],
      ownerTypeOptions: [],
      buildingsUnits: [],
      currentTask: null,
      formTask: {
        title: null,
        category: null,
        owner: { type: undefined, name: undefined },
        checklist: [{ check: false, value: null }],
      },
    };
  },
  created() {
    EventBus.$on("open-add-task-modal", (data) => {
      if (data) {
        this.currentTask = data;
        this.formTask = data;
      }
      this.resetForm();
      this.visibleModal = true;
    });
  },
  mounted() {
    this.loadCategories();
    this.loadOwnerTypeOptions();
  },
  methods: {
    closeModalTask() {
      if (this.currentTask) {
        this.formTask = this.currentTask;
      } else {
        this.resetForm();
      }
      this.visibleModal = false;
    },
    saveTask() {
      EventBus.$emit("save-task", this.formTask);
      this.visibleModal = false;
    },
    loadCategories() {
      this.categoryOptions = [
        { value: "other", label: "Not specified", icon: "check" },
        { value: "maintenance", label: "Maintenance", icon: "setting" },
        { value: "incident", label: "Incident", icon: "alert" },
      ];
    },
    loadOwnerTypeOptions() {
      this.ownerTypeOptions = [
        { value: "Unit", label: "Unit" },
        { value: "Building", label: "Building" },
      ];
    },
    loadBuildings() {
      this.loadingbuildingsUnits = true;
      TaskService.getBuildings()
        .then((response) => {
          this.buildingsUnits = response;
          this.loadingbuildingsUnits = false;
        })
        .catch((e) => {
          this.loadingbuildingsUnits = false;
        });
    },
    loadUnits() {
      this.loadingbuildingsUnits = true;
      TaskService.getUnits()
        .then((response) => {
          this.buildingsUnits = response;
          this.loadingbuildingsUnits = false;
        })
        .catch((e) => {
          this.loadingbuildingsUnits = false;
        });
    },
    onChangeType(event) {
      if (event == "Building") {
        this.loadBuildings();
      } else {
        this.loadUnits();
      }
    },
    deleteSubTask(counter) {
      if (this.formTask && this.formTask.checklist.length > 0) {
        this.formTask.checklist.splice(counter, 1);
      }
    },
    addSubTask() {
      this.formTask.checklist.push({
        check: false,
        value: null,
      });
    },

    resetForm() {
      this.formTask = {
        title: null,
        category: null,
        owner: { type: undefined, name: undefined },
        checklist: [{ check: false, value: null }],
      };
    },
  },
});
</script>

<style>
</style>
