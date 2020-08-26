<template>
  <div
    class="storyCreator"
    :style="{
      position: 'absolute',
      minHeight: '100vh',
      width: '100vw',
      top: '0',
      left: '0',
      backgroundColor: '#00000085',
      backdropFilter: 'blur(10px)',
    }"
  >
    <!-- Elements -->
    <div
      v-if="mode === 0"
      :style="{
        position: 'absolute',
        left: 0,
        width: '400px',
        height: '95vh',
        marginLeft: '40px',
        marginTop: '20px',
      }"
    >

      <!-- Title & Dropdown -->
      <h1 :style="{ color: 'white', fontSize: '250%', fontWeight: 'bolder' }">
        Elements
        <a-dropdown>
          <a-icon
            type="plus-circle"
            :style="{ fontSize: '50%', verticalAlign: 'middle', cursor: 'pointer' }"
          />
          <a-menu slot="overlay">
            <a-menu-item>
              <a @click="createTextElement">
                <a-icon type="font-size" :style="{ marginRight: '10px' }" />
                Text
              </a>
            </a-menu-item>
            <a-menu-item>
              <a @click="createImageElement">
                <a-icon type="file-image" :style="{ marginRight: '10px' }" />
                Image
              </a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </h1>

      <!-- If no Elements -->
      <div
        v-if="!elements.length"
        :style="{
          color: '#FFFFFF50',
          fontSize: '16px',
          fontWeight: 600,
          textAlign: 'center',
          marginTop: '200px',
          width: '350px'
        }"
      >
        <span :style="{ fontSize: '25px', textAlign: 'center', marginBottom: '20px' }">
          no elements.
        </span>
        <br>
        <span>
          create one by clicking at the
          <a-icon
            type="plus-circle"
            :style="{ fontSize: '80%', verticalAlign: 'middle', margin: '0 5px' }"
          />
          symbol
        </span>
      </div>

      <!-- Single Element -->
      <a-card
        v-for="element in elements"
        :key="element.id"
        :style="{ width: '350px', marginBottom: '30px' }"
      >
        <a-avatar
          shape="square"
          size="large"
          src=""
          :icon="element.type == 1 ? 'font-size' : 'file-image'"
        />
        <span
          :style="{
            display: 'inline-block',
            verticalAlign: 'middle',
            marginLeft: '10px',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '16px',
            overflow: 'hidden',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            width: '190px',
          }"
        >
          {{ element.text || element.imageName || element.title }}
        </span>
        <a-tooltip title="Edit">
          <a-icon type="edit" :style="{ marginLeft: '10px' }" @click="editElement(element.id)" />
        </a-tooltip>
        <a-tooltip title="Delete">
          <a-icon
            type="delete"
            :style="{ marginLeft: '20px' }"
            @click="deleteElement(element.id)"
          />
        </a-tooltip>
      </a-card>
      <!-- END Single Elements -->

    </div>
    <!-- END Elements -->

    <!-- Background Color -->
    <div
      v-if="mode === 0"
      :style="{
        position: 'absolute',
        right: 0,
        width: '400px',
        height: '95vh',
        marginLeft: '40px',
        marginTop: '20px',
      }"
    >

      <h1 :style="{ color: 'white', fontSize: '250%', fontWeight: 'bolder' }">
        Background Color
      </h1>
      <!-- Solid Colors -->
      <div :style="{ marginTop: '25px', width: '350px' }" class="solid">
        <span :style="{ color: 'white', fontSize: '18px', fontWeight: 600 }">
          Solid:
        </span>
        <br>
        <a-avatar
          v-for="color in backgroundColors.slice(0, 12)"
          :key="backgroundColors.indexOf(color)"
          shape="circle"
          :style="{
            boxSizing: 'content-box',
            background: color,
            border: '2px white solid',
            marginRight: '15px',
            marginTop: '15px',
            cursor: 'pointer',
          }"
          @click="changeBackground(color)"
        >
          <a-icon
            v-if="backgroundColors[selectedBackgroundColor] === color"
            type="check-circle"
            theme="filled"
            :style="{
              fontSize: '20px',
              marginTop: '6px',
              color: color === 'white' ? 'black' : 'white',
            }"
          />
        </a-avatar>
      </div>
      <!-- Gradien Colors -->
      <div :style="{ marginTop: '50px', width: '350px' }" class="gradients">
        <span :style="{ color: 'white', fontSize: '18px', fontWeight: 600 }">
          Gradients:
        </span>
        <br>
        <a-avatar
          v-for="color in backgroundColors.slice(12, 24)"
          :key="backgroundColors.indexOf(color)"
          shape="circle"
          :style="{
            boxSizing: 'content-box',
            background: color,
            border: '2px white solid',
            marginRight: '15px',
            marginTop: '15px',
            cursor: 'pointer',
          }"
          @click="changeBackground(color)"
        >
          <a-icon
            v-if="backgroundColors[selectedBackgroundColor] === color"
            type="check-circle"
            theme="filled"
            :style="{
              fontSize: '20px',
              marginTop: '6px',
              color: color === 'white' ? 'black' : 'white'
            }"
          />
        </a-avatar>
      </div>

      <!-- Finish Buttons -->
      <div
        :style="{
          position: 'absolute',
          bottom: '10px',
          left: '0'
        }"
      >
        <a-button
          type="danger"
          :style="{ marginRight: '15px' }"
          @click="exit"
        >
          <a-icon type="close-circle" />
          Exit
        </a-button>

        <a-button
          :type="saveButton.type"
          :style="{ marginRight: '15px' }"
          @click="save"
          @mouseenter="retrySaveButton(true)"
          @mouseleave="retrySaveButton(false)"
        >
          <a-icon :type="saveButton.icon" />
          {{ saveButton.text }}
        </a-button>

        <a-button
          :type="postButton.type"
          @click="post"
          @mouseenter="retryPostButton(true)"
          @mouseleave="retryPostButton(false)"
        >
          <a-icon :type="postButton.icon" />
          {{ postButton.text }}
        </a-button>
      </div>

    </div>
    <!-- END Background Color -->

    <!-- Edit Text -- Typography -->
    <div
      v-if="mode === 1"
      :style="{
        position: 'absolute',
        left: 0,
        width: '400px',
        marginLeft: '40px',
        marginTop: '20px',
      }"
    >

      <!-- Title -->
      <h2 :style="{ color: 'white', fontSize: '200%', fontWeight: 'bolder' }">
        <a-icon
          type="arrow-left"
          :style="{ fontSize: '70%', verticalAlign: 'middle', marginRight: '15px' }"
          @click="goBack"
        />
        Typography
      </h2>

      <!-- Typography -- Text Input -->
      <div :style="{ marginTop: '40px' }" class="text">
        <span :style="{ color: 'white', fontSize: '18px', fontWeight: 600 }">
          Text:
        </span>
        <br>
        <a-textarea
          autoFocus
          placeholder="text to include"
          :style="{ width: '286px', marginTop: '10px' }"
          v-model="currentlyEditing.text"
        />
      </div>

      <!-- Typography -- Divider -->
      <div :style="{ width: '286px' }" class="divider">
        <br>
        <a-divider dashed/>
      </div>

      <!-- Typography -- Alignment & Style -->
      <div :style="{ marginTop: '30px' }" class="styles">
        <span :style="{ color: 'white', fontSize: '18px', fontWeight: 600 }">
          Styles:
        </span>
        <br>
        <div :style="{ marginTop: '10px' }">
          <!-- Typography -- Alignment -->
          <a-radio-group
            v-model="currentlyEditing.align"
          >
            <a-radio-button  value="left">
              <a-icon type="align-left" />
            </a-radio-button>
            <a-radio-button value="center">
              <a-icon type="align-center" />
            </a-radio-button>
            <a-radio-button value="right">
              <a-icon type="align-right" />
            </a-radio-button>
          </a-radio-group>
          <!-- Typography -- Style -->
          <a-button-group :style="{ marginLeft: '13px' }">
            <a-button
              :type="currentlyEditing.bold ? 'primary' : 'default'"
              @click="
                currentlyEditing.bold
                =
                !currentlyEditing.bold
              "
            >
              <a-icon type="bold" />
            </a-button>
            <a-button
              :type="currentlyEditing.italic ?'primary' : 'default'"
              @click="
                currentlyEditing.italic
                =
                !currentlyEditing.italic
              "
            >
              <a-icon type="italic" />
            </a-button>
            <a-button
              :type="currentlyEditing.underline ?'primary' : 'default'"
              @click="
                currentlyEditing.underline
                =
                !currentlyEditing.underline
              "
            >
              <a-icon type="underline" />
            </a-button>
          </a-button-group>
        </div>
      </div>

      <br>

      <!-- Typography -- Height -->
      <div :style="{ marginTop: '20px' }" class="height">
        <span :style="{ color: 'white', fontSize: '18px', fontWeight: 600 }">
          Height:
        </span>
        <br>
        <a-row :style="{ marginTop: '10px' }">
          <a-col :span="11">
            <a-slider
              v-model="currentlyEditing.margin"
              :min="0"
              :max="100"
              :style="{ marginLeft: '0px' }"
            />
          </a-col>
          <a-col :span="1">
              <a-input-number
                v-model="currentlyEditing.margin"
                :min="0"
                :max="100"
                :formatter="value => `${value}%`"
                :parser="value => value.replace('%', '')"
                :style="{ marginLeft: '10px' }"
              />
          </a-col>
        </a-row>
      </div>

      <br>

      <!-- Typography -- Size -->
      <div :style="{ marginTop: '20px' }" class="size">
        <span :style="{ color: 'white', fontSize: '18px', fontWeight: 600 }">
          Size:
        </span>
        <br>
        <a-row :style="{ marginTop: '10px' }">
          <a-col :span="11">
            <a-slider
              v-model="currentlyEditing.size"
              :min="1"
              :max="150"
              :style="{ marginLeft: '0px' }"
            />
          </a-col>
          <a-col :span="1">
            <a-input-number
              v-model="currentlyEditing.size"
              :min="1"
              :max="150"
              :formatter="value => `${value}px`"
              :parser="value => value.replace('px', '')"
              :style="{ marginLeft: '10px' }"
            />
          </a-col>
        </a-row>
      </div>

    </div>
  <!-- END Edit Text -- Typography  -->

  <!-- Edit Text -- Color -->
    <div
      v-if="mode === 1"
      :style="{
        position: 'absolute',
        right: 0,
        width: '400px',
        marginLeft: '40px',
        marginTop: '20px',
      }"
    >
      <!-- Text Color -- Title -->
      <h2 :style="{ color: 'white', fontSize: '200%', fontWeight: 'bolder' }">
        Color
      </h2>

      <!-- Text Color -->
      <div :style="{ marginTop: '25px', width: '350px' }" class="solid">
        <span :style="{ color: 'white', fontSize: '18px', fontWeight: 600 }">
          Solid:
        </span>
        <br>
        <a-avatar
          v-for="color in colors"
          :key="colors.indexOf(color)"
          shape="circle"
          :style="{
            boxSizing: 'content-box',
            background: color,
            border: '2px white solid',
            marginRight: '15px',
            marginTop: '15px',
          }"
          @click="currentlyEditing.color = colors.indexOf(color)"
        >
          <a-icon
            v-if="colors[currentlyEditing.color] === color"
            type="check-circle"
            theme="filled"
            :style="{
              fontSize: '20px',
              marginTop: '6px',
              color: color === 'white' ? 'black' : 'white'
            }"
          />
        </a-avatar>
      </div>

    </div>
    <!-- END Edit Element -- Color -->

    <!-- Edit Element -- Image Upload -->
    <div
      v-if="mode === 2"
      :style="{
        position: 'absolute',
        left: 0,
        width: '400px',
        marginLeft: '40px',
        marginTop: '20px',
      }"
    >
      <!-- Image -- Title -->
      <h2 :style="{ color: 'white', fontSize: '200%', fontWeight: 'bolder' }">
        <a-icon
          type="arrow-left"
          :style="{ fontSize: '70%', verticalAlign: 'middle', marginRight: '15px' }"
          @click="goBack"
        />
        Image
      </h2>

      <!-- Image -- Upload -->
      <a-upload
        name="avatar"
        list-type="picture-card"
        accept="image/*"
        class="avatar-uploader"
        :show-upload-list="false"
        action="http://localhost:8081/api/stories/image"
        :style="{ marginTop: '30px' }"
        @change="upload"
      >
        <img
          v-if="currentlyEditing.imageUrl"
          :src="currentlyEditing.imageUrl"
          alt="avatar"
          :style="{ height: '110px', borderRadius: '4px' }"
        />
        <div v-else>
          <a-icon
            :type="currentlyEditing.loading ? 'loading' : 'plus'"
          />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>

      <!-- Image -- Divider -->
      <div :style="{ width: '286px' }" class="divider">
        <br>
        <a-divider dashed/>
      </div>

      <!-- Image -- Border -->
      <div :style="{ marginTop: '' }">
        <span :style="{ color: 'white', fontSize: '18px', fontWeight: 600 }">
          Border:
        </span>
        <br>
        <a-radio-group
          v-model="currentlyEditing.rounded"
          :disabled="
            currentlyEditing.background
            ||
            !currentlyEditing.imageUrl
          "
          :style="{ marginTop: '10px' }"
        >
          <a-radio-button :value="0">
            Normal
          </a-radio-button>
          <a-radio-button :value="1">
            Rounded
          </a-radio-button>
          <a-radio-button :value="2">
            Circle
          </a-radio-button>
        </a-radio-group>
      </div>

      <!-- Image -- Width -->
      <div :style="{ marginTop: '30px' }">
        <span :style="{ color: 'white', fontSize: '18px', fontWeight: 600 }">
          Width:
        </span>
        <br>
        <a-row>
          <a-col :span="11">
            <a-slider
              v-model="currentlyEditing.width"
              :min="0"
              :max="450"
              :disabled="
                currentlyEditing.background
                ||
                !currentlyEditing.imageUrl
              "
              :style="{ marginLeft: '0px' }"
            />
          </a-col>
          <a-col :span="1">
            <a-input-number
              v-model="currentlyEditing.width"
              :min="0"
              :max="450"
              :formatter="value => `${value}px`"
              :parser="value => value.replace('px', '')"
              :disabled="
                currentlyEditing.background
                ||
                !currentlyEditing.imageUrl
              "
              :style="{ marginLeft: '10px' }"
            />
          </a-col>
        </a-row>
      </div>

    </div>
    <!-- END Edit Element -- Image -->

    <!-- Edit Element -- Image Position -->
    <div
      v-if="mode === 2"
      :style="{
        position: 'absolute',
        right: 0,
        width: '400px',
        marginLeft: '40px',
        marginTop: '20px',
      }"
    >
      <!-- Image Position -- Title -->
      <h2 :style="{ color: 'white', fontSize: '200%', fontWeight: 'bolder' }">
        Position
      </h2>

      <!-- Image Position -- Margin X -->
      <div :style="{ marginTop: '30px' }">
        <span :style="{ color: 'white', fontSize: '18px', fontWeight: 600 }">
          <a-icon type="arrows-alt" :rotate="45" :style="{ marginRight: '10px' }" />
          Margin X:
        </span>
        <br>
        <a-row>
          <a-col :span="11">
            <a-slider
              v-model="currentlyEditing.marginX"
              :min="0"
              :max="450 - currentlyEditing.width"
              :disabled="
                currentlyEditing.background
                ||
                !currentlyEditing.imageUrl
              "
              :style="{ marginLeft: '0px' }"
            />
          </a-col>
          <a-col :span="1">
            <a-input-number
              v-model="currentlyEditing.marginX"
              :min="0"
              :max="450 - currentlyEditing.width"
              :formatter="value => `${value}px`"
              :parser="value => value.replace('px', '')"
              :disabled="
                currentlyEditing.background
                ||
                !currentlyEditing.imageUrl
              "
              :style="{ marginLeft: '10px' }"
            />
          </a-col>
        </a-row>
      </div>

      <!-- Image Position -- Margin Y -->
      <div :style="{ marginTop: '30px' }">
        <span :style="{ color: 'white', fontSize: '18px', fontWeight: 600 }">
          <a-icon type="arrows-alt" :rotate="-45" :style="{ marginRight: '10px' }" />
          Margin Y:
        </span>
        <br>
        <a-row>
          <a-col :span="11">
            <a-slider
              v-model="currentlyEditing.marginY"
              :min="0"
              :max="100"
              :disabled="
                currentlyEditing.background
                ||
                !currentlyEditing.imageUrl
              "
              :style="{ marginLeft: '0px' }"
            />
          </a-col>
          <a-col :span="1">
            <a-input-number
              v-model="currentlyEditing.marginY"
              :min="0"
              :max="100"
              :formatter="value => `${value}%`"
              :parser="value => value.replace('%', '')"
              :disabled="
                currentlyEditing.background
                ||
                !currentlyEditing.imageUrl
              "
              :style="{ marginLeft: '10px' }"
            />
          </a-col>
        </a-row>
      </div>

      <!-- Image Position -- Background -->
      <a-button
        :type="currentlyEditing.background ? 'primary' : 'default'"
        :disabled="!currentlyEditing.imageUrl"
        :style="{ width: '284px', marginTop: '30px' }"
        @click="makeBackground"
        block
      >
        Make as Background
      </a-button>

    </div>
    <!-- END Edit Element -- Image Position -->

    <!-- Story Preview -->
    <div
      :style="{
        position: 'absolute',
        height: '100vh',
        width: '35vw',
        top: '0',
        left: '0',
        right: '0',
        marginLeft: 'auto',
        marginRight: 'auto',
        background: backgroundColors[selectedBackgroundColor],
      }"
    >
      <!-- User -->
      <!-- <div :style="{ position: 'absolute', zIndex: '99' }" >
        <a-avatar
          src="https://weneedfun.com/wp-content/uploads/2016/01/Pink-Flower-17.jpg"
          :style="{ border: 'white 1px solid', margin: '10px' }"
        />
        <span :style="{ color: 'white', fontWeight: 'bold' }">
          username
        </span>
      </div> -->

      <!-- Elements Container -->
      <div
        :style="{
          height: '100%',
          width: '90%',
          margin: 'auto'
        }"
      >
      <!-- Single Element -->
      <span
        v-for="element in elements"
        :key="element.id"
      >
        <!-- Text Element -->
        <span
          v-if="element.type === 1"
          :style="{
            position:'absolute',
            display: 'block',
            width: '90%',
            padding: '0',

            color: colors[element.color],
            textAlign:  element.align,
            fontSize: `${element.size}px`,
            marginTop: `${element.margin}vh`,
            fontWeight: element.bold ? 'bold' : 'normal',
            fontStyle: element.italic ? 'italic' : 'normal',
            textDecoration: element.underline ? 'underline' : 'none',
            zIndex: '1',
          }"
        >
          {{ element.text }}
        </span>

        <!-- Image Element -->
        <img
          v-if="element.type === 2"
          :src="element.imageUrl"
          :style="{
            position: 'absolute',
            maxWidth: '35vw',
            maxHeight: '100vh',

            borderRadius: element.background ? '0' : roundness(element.rounded),
            width: element.background ? '35vw' : `${element.width}px`,
            height: element.background ? '100vh' : 'inherit',
            left: element.background ? '0px' : '',
            marginTop: `${element.background ? '0' : element.marginY}vh`,
            marginLeft: `${element.background ? '0' : element.marginX}px`,
            zIndex: element.background ? '0' : '1',
          }"
        >
      </span>
      <!-- END Element-->

      </div>

    </div>
    <!-- END Story Preview -->

  </div>

</template>

<script>
import http from '@/axios.config.js';

export default {
  name: 'StoryCreator',

  data() {
    return {
      mode: 0, // 0: elements, 1: text, 2: image;
      elementIdCounter: 0,
      currentlyEditingId: 0,
      elements: [],
      colors: [
        'white',
        'black',
        '#eb3b5a',
        '#20bf6b',
        '#3867d6',
        '#f7b731',
        '#fa8231',
        '#8854d0',
        '#2d98da',
        '#0fb9b1',
        '#4b6584',
        '#a5b1c2',
      ],
      backgroundColors: [
        'white',
        'black',
        '#eb3b5a',
        '#20bf6b',
        '#3867d6',
        '#f7b731',
        '#fa8231',
        '#8854d0',
        '#2d98da',
        '#0fb9b1',
        '#4b6584',
        '#a5b1c2',
        'linear-gradient(45deg, #119DA4, #04B46D ,  #FBF33C)',
        'linear-gradient(45deg, #FF1F01,#FD5D1B , #FFC700)',
        'linear-gradient(45.34deg, #EA52F8 5.66%, #0066FF 94.35%)',
        'linear-gradient(45.34deg, #1D2252 5.66%, #72AAFF 50.01%, #00FFFF 94.35%)',
        'linear-gradient(45.34deg, #FBB13C 5.66%, #FF7A72 48.62%, #FF7A72 94.35%)',
        'linear-gradient(223.88deg, #FF149D 8.89%, #620F32 94.31%)',
      ],
      selectedBackgroundColor: 0,
      savedId: null,
      saveButton: {
        text: 'Save',
        icon: 'save',
        type: 'default',
      },
      postButton: {
        text: 'Post',
        icon: 'upload',
        type: 'primary',
      },
    };
  },

  methods: {
    // Elements
    createTextElement() {
      this.elements.push({
        id: this.elementIdCounter,
        type: 1,
        title: `Element ${this.elementIdCounter + 1}`,
        text: '',
        align: 'center',
        bold: true,
        italic: false,
        underline: false,
        margin: 20,
        size: 50,
        color: 1,
      });
      this.mode = 1;
      this.currentlyEditingId = this.elementIdCounter;
      this.elementIdCounter += 1;
      this.resetSaveButton();
    },

    createImageElement() {
      this.elements.push({
        id: this.elementIdCounter,
        type: 2,
        title: `Element ${this.elementIdCounter + 1}`,
        imageName: '',
        imageUrl: '',
        loading: false,
        background: false,
        width: 200,
        marginX: 125,
        marginY: 10,
        rounded: 1,
      });
      this.mode = 2;
      this.currentlyEditingId = this.elementIdCounter;
      this.elementIdCounter += 1;
      this.resetSaveButton();
    },

    editElement(id) {
      this.currentlyEditingId = id;
      this.mode = this.currentlyEditing.type;
      this.resetSaveButton();
    },

    deleteElement(id) {
      if (this.elements.find((el) => el.id === id).imageId) {
        this.deleteImage(this.elements.find((el) => el.id === id).imageId);
      }
      this.elements = this.elements.filter((el) => el.id !== id);
      this.resetSaveButton();
    },

    changeBackground(color) {
      this.selectedBackgroundColor = this.backgroundColors.indexOf(color);
      this.resetSaveButton();
    },

    goBack() {
      this.mode = 0;
      this.currentlyEditingId = null;
    },
    // END Elements

    // Image
    upload(info) {
      if (info.file.status === 'uploading') {
        this.currentlyEditing.loading = true;
      } else if (info.file.status === 'done') {
        const { response } = info.file;
        this.currentlyEditing.imageId = response.id;
        this.currentlyEditing.imageUrl = response.url;
        this.currentlyEditing.imageName = response.name;
      }
    },

    async deleteImage(id) {
      await http.delete(`/stories/image/${id}`);
    },

    makeBackground() {
      this.currentlyEditing.background = !this.currentlyEditing.background;
    },

    roundness(border) {
      switch (border) {
        case 0:
          return '0';

        case 1:
          return '10%';

        case 2:
          return '100%';

        default:
          return '0';
      }
    },
    // END Image

    // Actions
    // exit
    exit() {
      this.$confirm({
        title: 'Are you sure you want to exit?',
        okText: 'Exit',
        okType: 'danger',
        cancelText: 'Cancel',
        onOk: () => {
          if (!this.savedId) {
            this.elements.forEach((el) => {
              if (el.type === 2) {
                this.deleteImage(el.imageId);
              }
            });
          }
          this.$emit('exit');
        },
      });
    },

    // save
    async save() {
      try {
        this.saveButton.type = 'default';
        this.saveButton.icon = 'loading';
        this.saveButton.text = 'Saving...';

        const response = await http.post('/stories/save', {
          background: this.selectedBackgroundColor,
          elements: this.elements,
        });

        this.$message.success('Your story has been successfully saved.', 5);
        this.savedId = response.data.id;
        this.saveButton.type = 'primary';
        this.saveButton.icon = 'check';
        this.saveButton.text = 'Saved';
      } catch (err) {
        this.$message.error('An error has occurred while saving your story.', 5);
        this.saveButton.type = 'danger';
        this.saveButton.icon = 'close';
        this.saveButton.text = 'Error';
      }
    },

    async deleteSave(id) {
      await http.delete(`/stories/save/${id}`);
    },

    resetSaveButton() {
      if (this.savedId) {
        this.deleteSave(this.savedId);
      }
      this.savedId = null;
      this.saveButton.type = 'dafault';
      this.saveButton.icon = 'save';
      this.saveButton.text = 'Save';
    },

    retrySaveButton(entered) {
      if (this.saveButton.text === 'Error' && entered) {
        this.saveButton.text = 'Retry';
        this.saveButton.icon = 'redo';
      } else if (this.saveButton.text === 'Retry' && !entered) {
        this.saveButton.text = 'Error';
        this.saveButton.icon = 'close';
      }
    },

    // post
    async post() {
      try {
        this.postButton.type = 'primary';
        this.postButton.icon = 'loading';
        this.postButton.text = 'Posting...';

        await http.post('/stories/', {
          background: this.selectedBackgroundColor,
          elements: this.elements,
        });

        this.$emit('exit');
        this.$message.success('Your story has been successfully posted.', 5);
      } catch (err) {
        this.$message.error('An error has occurred while posting your story.', 5);
        this.postButton.type = 'danger';
        this.postButton.icon = 'close';
        this.postButton.text = 'Error';
      }
    },

    retryPostButton(entered) {
      if (this.postButton.text === 'Error' && entered) {
        this.postButton.text = 'Retry';
        this.postButton.icon = 'redo';
      } else if (this.postButton.text === 'Retry' && !entered) {
        this.postButton.text = 'Error';
        this.postButton.icon = 'close';
      }
    },
    // END Actions
  },

  computed: {
    currentlyEditing() {
      return this.elements.find((e) => e.id === this.currentlyEditingId);
    },
  },

};
</script>

<style lang="css">
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}
.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
