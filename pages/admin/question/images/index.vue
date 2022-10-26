<template>
  <div class="container">
    <AdminTableHeader/>
    <AdminQuestionTable :requestUrl="`admin/question/questionsImages`"/>
  </div>
</template>
<script>
import AdminTableHeader from "../../../../components/AdminTableHeader";
import AdminQuestionTable from "../../../../components/AdminQuestionTable";

export default {
  components: {AdminTableHeader, AdminQuestionTable},
  middleware: 'isAdmin',
}
</script>
