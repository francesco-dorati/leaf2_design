<template>
  <div
    class="storyCreator"
    :style="{
      position: 'absolute',
      height: '100vh',
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
              <a @click="createElementText">
                <a-icon type="font-size" :style="{ marginRight: '10px' }" />
                Text
              </a>
            </a-menu-item>
            <a-menu-item>
              <a @click="createElementImage">
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
          }"
          @click="selectedBackgroundColor = backgroundColors.indexOf(color)"
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
          }"
          @click="selectedBackgroundColor = backgroundColors.indexOf(color)"
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
          autofocus
          placeholder="text to include"
          :style="{ width: '286px', marginTop: '10px' }"
          v-model="elements[indexOf(currentlyEditing)].text"
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
            v-model="elements[indexOf(currentlyEditing)].align"
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
              :type="elements[indexOf(currentlyEditing)].bold ? 'primary' : 'default'"
              @click="
                elements[indexOf(currentlyEditing)].bold
                =
                !elements[indexOf(currentlyEditing)].bold
              "
            >
              <a-icon type="bold" />
            </a-button>
            <a-button
              :type="elements[indexOf(currentlyEditing)].italic ? 'primary' : 'default'"
              @click="
                elements[indexOf(currentlyEditing)].italic
                =
                !elements[indexOf(currentlyEditing)].italic
              "
            >
              <a-icon type="italic" />
            </a-button>
            <a-button
              :type="elements[indexOf(currentlyEditing)].underline ? 'primary' : 'default'"
              @click="
                elements[indexOf(currentlyEditing)].underline
                =
                !elements[indexOf(currentlyEditing)].underline
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
              v-model="elements[indexOf(currentlyEditing)].margin"
              :min="0"
              :max="100"
              :style="{ marginLeft: '0px' }"
            />
          </a-col>
          <a-col :span="1">
              <a-input-number
                v-model="elements[indexOf(currentlyEditing)].margin"
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
              v-model="elements[indexOf(currentlyEditing)].size"
              :min="1"
              :max="150"
              :style="{ marginLeft: '0px' }"
            />
          </a-col>
          <a-col :span="1">
            <a-input-number
              v-model="elements[indexOf(currentlyEditing)].size"
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
          @click="elements[indexOf(currentlyEditing)].color = colors.indexOf(color)"
        >
          <a-icon
            v-if="colors[elements[indexOf(currentlyEditing)].color] === color"
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
        action="http://localhost:8081/api/posts/image"
        :style="{ marginTop: '30px' }"
        @change="upload"
      >
        <img
          v-if="elements[indexOf(currentlyEditing)].imageUrl"
          :src="elements[indexOf(currentlyEditing)].imageUrl"
          alt="avatar"
          :style="{ height: '110px', borderRadius: '4px' }"
        />
        <div v-else>
          <a-icon :type="elements[indexOf(currentlyEditing)].loading ? 'loading' : 'plus'" />
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
          v-model="elements[indexOf(currentlyEditing)].rounded"
          :disabled="
            elements[indexOf(currentlyEditing)].background
            ||
            !elements[indexOf(currentlyEditing)].imageUrl
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
              v-model="elements[indexOf(currentlyEditing)].width"
              :min="0"
              :max="450"
              :disabled="
                elements[indexOf(currentlyEditing)].background
                ||
                !elements[indexOf(currentlyEditing)].imageUrl
              "
              :style="{ marginLeft: '0px' }"
            />
          </a-col>
          <a-col :span="1">
            <a-input-number
              v-model="elements[indexOf(currentlyEditing)].width"
              :min="0"
              :max="450"
              :formatter="value => `${value}px`"
              :parser="value => value.replace('px', '')"
              :disabled="
                elements[indexOf(currentlyEditing)].background
                ||
                !elements[indexOf(currentlyEditing)].imageUrl
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
          <a-icon type="arrows-alt" rotate="45" :style="{ marginRight: '10px' }" />
          Margin X:
        </span>
        <br>
        <a-row>
          <a-col :span="11">
            <a-slider
              v-model="elements[indexOf(currentlyEditing)].marginX"
              :min="0"
              :max="450 - elements[indexOf(currentlyEditing)].width"
              :disabled="
                elements[indexOf(currentlyEditing)].background
                ||
                !elements[indexOf(currentlyEditing)].imageUrl
              "
              :style="{ marginLeft: '0px' }"
            />
          </a-col>
          <a-col :span="1">
            <a-input-number
              v-model="elements[indexOf(currentlyEditing)].marginX"
              :min="0"
              :max="450 - elements[indexOf(currentlyEditing)].width"
              :formatter="value => `${value}px`"
              :parser="value => value.replace('px', '')"
              :disabled="
                elements[indexOf(currentlyEditing)].background
                ||
                !elements[indexOf(currentlyEditing)].imageUrl
              "
              :style="{ marginLeft: '10px' }"
            />
          </a-col>
        </a-row>
      </div>

      <!-- Image Position -- Margin Y -->
      <div :style="{ marginTop: '30px' }">
        <span :style="{ color: 'white', fontSize: '18px', fontWeight: 600 }">
          <a-icon type="arrows-alt" rotate="-45" :style="{ marginRight: '10px' }" />
          Margin Y:
        </span>
        <br>
        <a-row>
          <a-col :span="11">
            <a-slider
              v-model="elements[indexOf(currentlyEditing)].marginY"
              :min="0"
              :max="100"
              :disabled="
                elements[indexOf(currentlyEditing)].background
                ||
                !elements[indexOf(currentlyEditing)].imageUrl
              "
              :style="{ marginLeft: '0px' }"
            />
          </a-col>
          <a-col :span="1">
            <a-input-number
              v-model="elements[indexOf(currentlyEditing)].marginY"
              :min="0"
              :max="100"
              :formatter="value => `${value}%`"
              :parser="value => value.replace('%', '')"
              :disabled="
                elements[indexOf(currentlyEditing)].background
                ||
                !elements[indexOf(currentlyEditing)].imageUrl
              "
              :style="{ marginLeft: '10px' }"
            />
          </a-col>
        </a-row>
      </div>

      <!-- Image Position -- Background -->
      <a-button
        :type="elements[indexOf(currentlyEditing)].background ? 'primary' : 'default'"
        :disabled="!elements[indexOf(currentlyEditing)].imageUrl"
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
        width: '500px',
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
            maxWidth: '500px',
            maxHeight: '100vh',

            borderRadius: element.background ? '0' : roundness(element.rounded),
            width: `${element.background ? '500' : element.width}px`,
            height: element.background ? '100vh' : 'inherit',
            left: element.background ? '0px' : '',
            marginTop: `${element.background ? '0' : element.marginY}vh`,
            marginLeft: `${element.background ? '0' : element.marginX}px`,
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
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export default {
  name: 'StoryCreator',

  data() {
    return {
      mode: 0,
      currentlyEditing: 0,
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
    };
  },

  methods: {
    createElementText() {
      const { length } = this.elements;
      this.elements.push({
        id: length,
        type: 1,
        title: `Element ${length + 1}`,
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
      this.currentlyEditing = length;
    },

    createElementImage() {
      const { length } = this.elements;
      this.elements.push({
        id: length,
        type: 2,
        title: `Element ${length + 1}`,
        imageName: '',
        imageUrl: '',
        loading: false,
        background: false,
        width: 200,
        height: null,
        marginX: 125,
        marginY: 10,
        rounded: 1,
      });
      this.mode = 2;
      this.currentlyEditing = length;
    },

    editElement(id) {
      this.mode = this.elements[this.indexOf(id)].type;
      this.currentlyEditing = id;
    },

    deleteElement(id) {
      this.elements = this.elements.filter((element) => element.id !== id);
    },

    goBack() {
      this.mode = 0;
      this.currentlyEditing = null;
    },

    indexOf(id) {
      return this.elements.findIndex((element) => element.id === id);
    },

    upload(info) {
      if (info.file.status === 'uploading') {
        this.elements[this.indexOf(this.currentlyEditing)].loading = true;
      } else if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.elements[this.indexOf(this.currentlyEditing)].imageUrl = imageUrl;
          this.elements[this.indexOf(this.currentlyEditing)].loading = false;
        });

        this.elements[this.indexOf(this.currentlyEditing)].imageName = info.file.name;
      }
    },

    makeBackground() {
      const { background } = this.elements[this.indexOf(this.currentlyEditing)];
      this.elements[this.indexOf(this.currentlyEditing)].background = !background;
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
