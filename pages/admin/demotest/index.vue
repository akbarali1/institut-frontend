<template>
  <div class="container">
    <AdminTableHeader/>
    <div class="row w-100 p-2 text-center " role="group">
      <nuxt-link :to="`/admin/demotest/create`" class="btn btn-primary m-1 btn-sm col-md-2">Test qo`shish</nuxt-link>
      <nuxt-link :to="`/admin/demotest/category-create`" class="btn btn-primary m-1 btn-sm col-md-2">Kategoriya qo`shish</nuxt-link>
    </div>
    <AdminDemoQuestionTable :requestUrl="`admin/demo/all`"/>
  </div>
</template>
<script>
export default {
  middleware: 'isAdmin',
}
</script>
