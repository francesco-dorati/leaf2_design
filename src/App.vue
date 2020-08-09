<template>
  <div id="app">
    <a-config-provider>
      <template #renderEmpty>
        <div style="text-align: center">
          <a-icon type="smile" style="font-size: 20px" />
          <p>CUSTOMIZE</p>
        </div>
      </template>
      <router-view/>
    </a-config-provider>
  </div>
</template>
