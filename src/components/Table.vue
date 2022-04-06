<script>
import Cell from "./Cell.vue";

export default {
    components: { Cell }
}
</script>


<template>
    <div class="overflow-x-auto">
  <table class="table table-compact w-full">
    <thead>
      <tr>
        <th>Mo</th> 
        <th>Tu</th> 
        <th>We</th> 
        <th>Th</th> 
        <th>Fr</th> 
        <th>Sa</th> 
        <th>Su</th>
      </tr>
    </thead> 
    <tbody>
      <tr v-for="index in 5" :key="index">
        <td v-for="index in 7" :key="index">
            <Cell/>
        </td>

      </tr>
    </tbody> 
    <tfoot>
      <tr> </tr>
    </tfoot>
  </table>
</div>
</template>