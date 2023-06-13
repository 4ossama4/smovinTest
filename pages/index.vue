<template>
  <div class="container pt-5">
    <div class="row align-items-center">
      <div class="col-md-10">
        <h3>Liste des taches</h3>
      </div>
      <div class="col-md-2 text-right">
        <a-button icon="plus" @click="openModalTask()" class="btn-primary"
          >Tache
        </a-button>
      </div>
    </div>
    <hr class="mt-2 mb-2" />
    <div class="row">
      <div class="col-md-12">
        <a-table :size="'middle'" :columns="columns" :data-source="listOfTask">
          
        </a-table>
      </div>
    </div>
    <task />
  </div>
</template>

<script >
import Vue from "vue";
import { EventBus } from "~/store/event-bus";

export default Vue.extend({
  data() {
    return {
      listOfTask: [],
      columns: [
        {
          title: "Titre",
          key: "titre",
          dataIndex: "title",
        },
        {
          title: "Type de tache",
          key: "category",
          dataIndex: "category",
        },
        {
          title: "Type de bien",
          key: "type",
          dataIndex: "owner.type",
        },
        {
          title: "Nom du bien",
          key: "name",
          dataIndex: "owner.name",
        }
      ],
    };
  },
  created() {
    EventBus.$on("save-task", (data) => {
      if (data) {
        this.listOfTask.push(data);
      }
    });
  },
  methods: {
    openModalTask() {
      EventBus.$emit("open-add-task-modal");
    },
  },
});
</script>

<style>
</style>
