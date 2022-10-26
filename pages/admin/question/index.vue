<template>
  <div class="container">
    <AdminTableHeader :requestUrl="`admin/question/info`"/>
    <AdminQuestionTable :requestUrl="`admin/question/all`"/>
  </div>
</template>
<script>
import AdminTableHeader from "../../../components/AdminTableHeader";
import AdminQuestionTable from "../../../components/AdminQuestionTable";

export default {
  components: {AdminTableHeader, AdminQuestionTable},
  middleware: 'isAdmin',
}
</script>
