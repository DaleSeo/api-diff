<template>
  <div>
    <table class="ui selectable celled teal table">
      <thead class="center aligned">
        <tr>
          <th colspan="4">요청 정보</th>
          <th colspan="3">응답 정보</th>
          <th rowspan="2">실행자</th>
          <th rowspan="2">수행 일시</th>
        </tr>
        <tr>
          <th>메소드</th>
          <th>URL</th>
          <th>쿼리 개수</th>
          <th>헤더 개수</th>
          <th>상태</th>
          <th>헤더 개수</th>
          <th>바디 길이</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="call in revCalls" @click="detail(call.id)">
          <td>{{call.request.method}}</td>
          <td>{{call.request.url}}</td>
          <td>{{keysLength(call.request.queries)}}</td>
          <td>{{keysLength(call.request.headers)}}</td>
          <td>{{call.response.statusCode}} {{call.response.statusMessage}}</td>
          <td>{{keysLength(call.response.headers)}}</td>
          <td>{{call.response.headers['Content-Length'] || call.response.body.length}}</td>
          <td>{{call.createdBy || '아무게'}}</td>
          <td>{{call.createdDate | formatDate}}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th colspan="9">
            <div class="ui right floated small primary labeled icon button">
              <i class="user icon"></i> Add User
            </div>
            <div class="ui small  button">
              Approve
            </div>
            <div class="ui small  disabled button">
              Approve All
            </div>
          </th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  props: ["calls"],
  computed: {
    revCalls() {
      return this.calls.slice().reverse();
    }
  },
  methods: {
    detail (id) {
      window.location.href = `/cases/${id}`
    },
    keysLength (object) {
      return object ? Object.keys(object).length : 0
    }
  }
}
</script>
