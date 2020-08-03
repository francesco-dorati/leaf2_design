<template>
  <a-result
    status="404"
    title="404"
    sub-title="Sorry, the page you visited does not exist."
    :style="{ margin: '50px 0' }"
    >
    <template #extra>
      <a-button
        type="primary"
        htmlType="a"
        href="/"
        >
        Back Home
      </a-button>
    </template>
  </a-result>
</template>
