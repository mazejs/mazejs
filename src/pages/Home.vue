<script setup lang="ts">
import Datagrid from '@/components/Datagrid.vue'

const data = [
  {id: 1, name: 'John Doe', email: 'john.doe@gmail.com', created_at: '2023-09-12 11:34:30'},
  {id: 2, name: 'Jane Doe', email: 'jane.doe@gmail.com', created_at: '2023-09-12 11:46:13'},
  {id: 2, name: 'James Doe', email: 'james.doe@gmail.com', created_at: '2023-09-12 11:46:13'},
  {id: 2, name: 'Eric Doe', email: 'eric.doe@gmail.com', created_at: '2023-09-12 11:46:13'},
  {id: 2, name: 'Ian Doe', email: 'ian.doe@gmail.com', created_at: '2023-09-12 11:46:13'},
]

const columns = [{name: 'name', label: 'Name'}, {name: 'email', label: 'Email'}, {name: 'created_at', label: 'Created at', format: 'datetime'}]

const meta = {
  total: 5,
  per_page: 10,
  current_page: 1,
  last_page: 1,
  from: 1,
  to: 5
}

const actions = [{name: "display", label: "Display"}]
const action = (data: any) => console.log(data.event, data.entry)
</script>

<template>
  <Datagrid
    table-name="Users list"
    :entries="data"
    :columns="columns"
    :meta="meta"
    :controls="true"
    :actions="actions"
    @action="action"
  ></Datagrid>
</template>
