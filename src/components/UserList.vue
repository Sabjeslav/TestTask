<template>
  <div id="body">
    <div class="genderChartButton" @click="showModal"> 
      <span> Show Chart </span>
    </div>
    <ModalWindow
      v-show="isModalVisible"
      @close="closeModal"
    />
    <div class="searchBar">
      <input class="inputBox" type="text" v-model="searchedUser" placeholder="Enter user name">
    </div>
    
    <div class="accordion" id="accordion">
      <div class="accordionItem">
        <div class="item">
          <div class="itemHeader">
            <div>
              <img class="smallAvatar" style="opacity: 0">
            </div>
            <div class="headerText">
              <span class="descriptionLabel">Last</span>  
            </div>
            <div class="headerText">
              First
            </div>
            <div class="headerText">
              Username
            </div>
            <div class="headerText">
              Phone
            </div>
            <div class="headerText">
              Location
            </div>
            <div class="headerText plus"></div>
          </div>
        </div>
      </div> 
      <div class="accordionItem" v-for="(user, index) in filteredList" v-bind:key="index">
        <div class="item">
          <div class="itemHeader">
            <div>
              <img class="smallAvatar" v-bind:src="user.picture.medium" alt="">
            </div>
            <div class="itemText">
              <span>{{user.name.last}}</span>  
            </div>
            <div class="itemText">
              {{user.name.first}}
            </div>
            <div class="itemText">
              {{user.login.username}}
            </div>
            <div class="itemText">
              {{user.phone}}
            </div>
            <div class="itemText">
              {{user.location.city}}
            </div>
            <div class="itemText plus" @click="toggleDescription(index)"> 
              {{index === openedID ? '-':'+'}}
            </div>
          </div>
        
          <div class="accordionItemDescription" v-if="index==openedID">
            <div class="userName">
              {{user.name.first}}
              <template v-if="user.gender === 'male'">
                <div>
                  <img class="genderIcon" src="../assets/icons/male.png" alt="">
                </div>
              </template>
              <template v-else>
                <div>
                  <img class="genderIcon" src="../assets/icons/female.png" alt="">
                </div>
              </template>
            </div>
            <div class="itemDescritionDetails">
              <div class="itemDescritionDetailsColumn">
                <span class="descriptionLabel">
                  Username 
                  <span class="descriptionText">{{user.login.username}}</span>
                </span>
                <span class="descriptionLabel">
                  Registered 
                  <span class="descriptionText"> {{user.registered.date}}  </span>
                </span>
                <span class="descriptionLabel">
                  Email 
                  <span class="descriptionText">{{user.email}}</span>
                </span>
              </div>

              <div class="itemDescritionDetailsColumn">
                <span class="descriptionLabel">
                  Address 
                  <span class="descriptionText">{{user.location.street.number}} {{user.location.street.name }}</span>
                </span>
                <span class="descriptionLabel">
                  City 
                  <span class="descriptionText">{{user.location.city}}</span>
                </span>
                <span class="descriptionLabel">
                  Zip code 
                  <span class="descriptionText">{{user.location.postcode}}</span>
                </span>
              </div>

              <div class="itemDescritionDetailsColumn">
                <span class="descriptionLabel">
                  Birthday 
                  <span class="descriptionText">{{user.dob.date}}</span>
                </span>
                <span class="descriptionLabel">
                  Phone 
                  <span class="descriptionText">{{user.phone}}</span>
                </span>
                <span class="descriptionLabel">
                  Cell 
                  <span class="descriptionText">{{user.cell}}</span>
                </span>
              </div>

              <div class="itemDescritionDetailsColumn">
                <img class="largeAvatar" v-bind:src="user.picture.large" alt="">
              </div>
            </div>
          </div> 
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
import ModalWindow from './ModalWindow'
import axios from 'axios' 
export default {
  name: 'UserList',
  components: {
    ModalWindow
  },
  data() {
    return {
      searchedUser: '',
      openedID: 'null',
      users: [],
      isModalVisible: false,
      counters: {
        counterMale: 0,
        counterFemale: 0,
      }
      
    }
  },
  async mounted() {
    let responce = await axios.get('https://randomuser.me/api/?results=10')
    console.log(responce);
    this.users = responce.data.results;
    console.log(this.users);
    this.users.forEach(user => {
      user.registered.date = this.formatDate(user.registered.date);
      user.dob.date = this.formatDate(user.dob.date);
      if (user.gender === "male") this.counters.counterMale++
      else this.counters.counterFemale++
    });
    // this.$store.commit('setGenders', {
    //   amount: 25
    // })
  },
  methods: {
    formatDate: function (responceDate) {
      let ISODate = new Date (responceDate);
      return ISODate.toLocaleDateString('en-US');
    },
    toggleDescription: function (id) {
      if (this.openedID === id) {
        this.openedID = null;
      } else {
        this.openedID = id;
      }
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  },
  computed: {
    filteredList: function () {
      let user = this.searchedUser.toLowerCase();
      return this.users.filter(function (elem) {
        if (user === "") return true;
        else return elem.name.first.toLowerCase().indexOf(user) > -1;
      })
    }
  }
}
</script>

<style>

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #body {
    display: flex;
    padding-bottom: 5%;
    flex-direction: column;
    background-color: #dfdfdf;
    min-height: 100vh;
  }

  .genderChartButton {
    background-color: rgb(0, 162, 255);
    display: flex;
    border-radius: 10px;
    margin-left: auto;
    margin-right: auto;
    width: 10%;
    height: 50px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-bottom: 25px;
    margin-top: 25px;
  }

  .genderChartButton:hover {
    background-color: rgb(70, 187, 255);
  }

  .itemHeader {
    width: 90%;
    margin-left: auto;  
    margin-right: auto;
    height: 100px;
    display: flex;
    flex-direction: row;
    background-color: inherit;
    padding-left: 1%;
  }

  .accordionHeader {
    width: 90%;
    margin-left: auto;  
    margin-right: auto;
    display: flex;
    flex-direction: row;    
  }

  .headerText{
    /* flex-basis: 200px;   */
    font-weight: bold;
    
  }

  .item{
    background-color: inherit;
    width: 90%;
    margin-left: auto;  
    margin-right: auto;
  }

  .smallAvatar{
    height: 100%;
    width: 100px;
    border: 5px solid white;
    border-radius: 50%;
  }

  .largeAvatar{
    height: 150px;
    width: auto;
    border: 5px solid white;
    border-radius: 50%;
  }


  .itemText {
    width: 25%;
    text-align: left;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 5%;
    flex-basis: auto;
  }

  .headerText {
    width: 25%;
    text-align: left;
    margin-top: auto;
    margin-left: 5%;
    flex-basis: auto;
  }  

  .plus {
    font-size: 75px;
    font-weight: bold;
    user-select: none;
    cursor: pointer;
    text-align: center;
  }

  .accordionItemDescription {
    width: 90%;
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    background-color: inherit;
    padding: 10px;
  }

  .userName {
    font-size: 35px;
    display: flex;
    flex-direction: row;
    margin-left: 10%;
  }

  .genderIcon {
    width: 11px;
    height: 30px;
    margin-left: 10px;
    margin-top: 5px;
  }

  .itemDescritionDetails {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
  }

  .itemDescritionDetailsColumn {
    display: inherit;
    flex-direction: column;
    text-align: left;
    margin-left: 10%;
  }

  .descriptionLabel {
    font-weight: bold;
    font-size: 15px;
  }

  .descriptionText {
    font-weight: normal;
  }

  .accordionItem {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }

  .searchBar {
    background-color: #dfdfdf;
  }

  .inputBox {
    height: 4vh;
    padding: 10px;
    border-radius: 10px;
    outline: none;
  }

  .accordionItem:nth-child(even) {
    background-color: #c7c7c7;
  }

  .accordionItem:nth-child(odd) {
    background-color: #dfdfdf;
  }

  @media screen and (max-width: 1500px) {
    .accordionItem {
      width: 100%;
    }
    .accordionItemDescription{
      width: 100%;
    }
    .item {
      width: 100%;
    }
  }

</style>