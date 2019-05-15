 <template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="(item, index) in tableHeader"
        :key="item.prop"
        :label="item.label"
        :width="item.width"
      >
        <template slot-scope="scope">{{ scope.row[item.prop] }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableHeader: {
      type: Array,
      default: []
    },
    tableData: {
      type: Array,
      default: []
    }
  }
};
</script>