import http from "../http-common";
import Vue from 'vue';
import axios from "axios";


class TaskService {




  async getUnits() {

    await new Promise((resolve) => setTimeout(resolve, 2000));
    return [{
        type: "Unit",
        id: "U1",
        name: "My Unit 1"
      },
      {
        type: "Unit",
        id: "U2",
        name: "My Unit 2"
      },
      {
        type: "Unit",
        id: "U3",
        name: "My Unit 3"
      }
    ];

  }

  async getBuildings() {

    await new Promise((resolve) => setTimeout(resolve, 2000));
    return [{
        type: "Building",
        id: "B1",
        name: "My Building 1"
      },
      {
        type: "Building",
        id: "B2",
        name: "My Building 2"
      },
      {
        type: "Building",
        id: "B3",
        name: "My Building 3"
      }
    ];

  }


}
export default new TaskService()
