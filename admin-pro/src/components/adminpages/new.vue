<template>
  <div class="wrapper">
    <el-button @click="addziduan" v-show="shower === 1">添加</el-button>
    方案名称:<span>{{ famc }}</span> 方案类型:<span>{{ falx }}</span>
    <!-- 第一次新增一个报价方案 -->
    <el-table
      :data="prototypes"
      class="kong-box"
      v-show="show === 1"
      :style="{ height: bodyHeight - 30 + 'px' }"
      :height="bodyHeight - 30"
      style="width: 100%; overflow: auto"
    >
      <el-table-column type="index" label="序号" width="140" align="center">
      </el-table-column>
      <el-table-column label="皮带编号" width="190" align="center">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.beltCode"
            placeholder="请输入皮带编号"
            clearable
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="皮带类型" width="190" align="center">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.beltType"
            placeholder="请选择皮带类型"
            @change="belt(scope.row)"
          >
            <el-option
              v-for="item in options"
              :key="item.dictionaryKey"
              :label="item.dictionaryValue"
              :value="item.dictionaryKey"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="长(毫米)" width="190" align="center">
        <template slot-scope="scope">
          <el-input-number
            v-model="scope.row.length"
            placeholder="请输入长度"
            clearable
            :min="0"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="宽(毫米)" width="190" align="center">
        <template slot-scope="scope">
          <el-select v-model="scope.row.width" placeholder="请选择宽度">
            <el-option
              v-for="item in options4"
              :key="item.dictionaryKey"
              :label="item.dictionaryValue"
              :value="item.dictionaryKey"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="高度(毫米)" width="190" align="center">
        <template slot-scope="scope">
          <el-input-number
            v-model="scope.row.beginHeight"
            placeholder="请输入起始高度"
            clearable
            :min="0"
          ></el-input-number>
          <el-input-number
            v-model="scope.row.endHeight"
            placeholder="请输入终止高度"
            clearable
            :min="0"
            v-show="scope.row.end === 1"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="护板类型" width="190" align="center">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.guardPlateType"
            placeholder="请选择护板类型"
            @change="guardPlate(scope.row)"
          >
            <el-option
              v-for="item in options1"
              :key="item.dictionaryKey"
              :label="item.dictionaryValue"
              :value="item.dictionaryKey"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="护板面数" width="190" align="center">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.guardPlateSide"
            placeholder="请选择护板面数"
          >
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="190" align="center">
        <template slot-scope="scope">
          <el-button size="mini" round type="primary" @click="save(scope.row)"
            >保存</el-button
          >
          <el-button size="mini" round type="primary" @click="del(scope.$index)"
            >删除</el-button
          >
          <el-button
            size="mini"
            round
            type="primary"
            @click="look(scope.row, scope.$index)"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-table
      :data="prototypes1"
      class="kong-box"
      v-show="show === 2"
      :style="{ height: bodyHeight - 30 + 'px' }"
      :height="bodyHeight - 30"
      style="width: 100%; overflow: auto"
    >
      <el-table-column type="index" label="序号" width="140" align="center">
      </el-table-column>
      <el-table-column
        label="皮带编号"
        width="190"
        align="center"
        prop="beltCode"
      >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.beltCode"
            placeholder="请输入皮带编号"
            clearable
            :disabled="scope.row.disabled"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="皮带类型" width="190" align="center">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.beltType"
            placeholder="请选择皮带类型"
            :disabled="scope.row.disabled"
          >
            <el-option
              v-for="item in options"
              :key="item.dictionaryKey"
              :label="item.dictionaryValue"
              :value="item.dictionaryKey"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="长(毫米)" width="190" align="center">
        <template slot-scope="scope">
          <el-input-number
            v-model="scope.row.length"
            placeholder="请输入长度"
            clearable
            :min="0"
            :disabled="scope.row.disabled"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="宽(毫米)" width="190" align="center">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.width"
            placeholder="请选择宽度"
            :disabled="scope.row.disabled"
          >
            <el-option
              v-for="item in options4"
              :key="item.dictionaryKey"
              :label="item.dictionaryValue"
              :value="item.dictionaryKey"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="高度(毫米)" width="190" align="center">
        <template slot-scope="scope">
          <el-input-number
            v-model="scope.row.beginHeight"
            placeholder="请输入起始高度"
            clearable
            :min="0"
            :disabled="scope.row.disabled"
          ></el-input-number>
          <el-input-number
            v-model="scope.row.endHeight"
            placeholder="请输入终止高度"
            clearable
            :min="0"
            v-show="scope.row.end === 1"
            :disabled="scope.row.disabled"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="护板类型" width="190" align="center">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.guardPlateType"
            placeholder="请选择护板类型"
            :disabled="scope.row.disabled"
            @change="guardPlate(scope.row)"
          >
            <el-option
              v-for="item in options1"
              :key="item.dictionaryKey"
              :label="item.dictionaryValue"
              :value="item.dictionaryKey"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="护板面数" width="190" align="center">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.guardPlateSide"
            placeholder="请选择护板面数"
            :disabled="scope.row.disabled"
          >
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="190" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            round
            type="primary"
            @click="chose(scope.row)"
            v-show="btn === 0"
            >修改</el-button
          >
          <el-button
            size="mini"
            round
            type="primary"
            @click="save1(scope.row)"
            v-show="btn === 0"
            >保存</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="组合皮带" :visible.sync="dialogTableVisible" width="80%">
      <el-button @click="addziduan1">添加</el-button>
      <el-table :data="prototypes2" class="kong-box">
        <el-table-column type="index" label="序号" width="140" align="center">
        </el-table-column>
        <el-table-column label="皮带类型" width="190" align="center">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.beltType"
              placeholder="请选择皮带类型"
              @change="belt1(scope.row)"
            >
              <el-option
                v-for="item in options3"
                :key="item.dictionaryKey"
                :label="item.dictionaryValue"
                :value="item.dictionaryKey"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="长(毫米)" width="190" align="center">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.length"
              placeholder="请输入长度"
              clearable
              type="number"
              :min="0"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="宽(毫米)" width="190" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.width" placeholder="请选择宽度">
              <el-option
                v-for="item in options4"
                :key="item.dictionaryKey"
                :label="item.dictionaryValue"
                :value="item.dictionaryKey"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="高度(毫米)" width="190" align="center">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.beginHeight"
              placeholder="请输入起始高度"
              clearable
              :min="0"
            ></el-input-number>
            <el-input-number
              v-model="scope.row.endHeight"
              placeholder="请输入终止高度"
              clearable
              :min="0"
              v-show="scope.row.end1 === 1"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="护板类型" width="190" align="center">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.guardPlateType"
              placeholder="请选择护板类型"
              @change="guardPlate(scope.row)"
            >
              <el-option
                v-for="item in options1"
                :key="item.dictionaryKey"
                :label="item.dictionaryValue"
                :value="item.dictionaryKey"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="护板面数" width="190" align="center">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.guardPlateSide"
              placeholder="请选择护板面数"
            >
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="190" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              round
              type="primary"
              @click="save2(scope.row)"
              >保存</el-button
            >
            <el-button
              size="mini"
              round
              type="primary"
              @click="del1(scope.$index)"
              >删除</el-button
            >
            <el-button
              size="mini"
              round
              type="primary"
              @click="look(scope.row, scope.$index)"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 当皮带类型为组合皮带的时候 -->
    <el-dialog title="组合皮带" :visible.sync="dialogTableVisible1" width="80%">
      <el-button @click="addziduan1">添加</el-button>
      <el-table :data="prototypes2" class="kong-box">
        <el-table-column type="index" label="序号" width="140" align="center">
        </el-table-column>
        <el-table-column label="皮带类型" width="190" align="center">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.beltType"
              placeholder="请选择皮带类型"
              @change="belt4(scope.row)"
            >
              <el-option
                v-for="item in options3"
                :key="item.dictionaryKey"
                :label="item.dictionaryValue"
                :value="item.dictionaryKey"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="长(毫米)" width="190" align="center">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.length"
              placeholder="请输入长度"
              clearable
              type="number"
              :min="0"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="宽(毫米)" width="190" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.width" placeholder="请选择宽度">
              <el-option
                v-for="item in options4"
                :key="item.dictionaryKey"
                :label="item.dictionaryValue"
                :value="item.dictionaryKey"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="高度(毫米)" width="190" align="center">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.beginHeight"
              placeholder="请输入起始高度"
              clearable
              :min="0"
            ></el-input-number>
            <el-input-number
              v-model="scope.row.endHeight"
              placeholder="请输入终止高度"
              clearable
              :min="0"
              v-show="scope.row.end4 === 1"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="护板类型" width="190" align="center">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.guardPlateType"
              placeholder="请选择护板类型"
              @change="guardPlate(scope.row)"
            >
              <el-option
                v-for="item in options1"
                :key="item.dictionaryKey"
                :label="item.dictionaryValue"
                :value="item.dictionaryKey"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="护板面数" width="190" align="center">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.guardPlateSide"
              placeholder="请选择护板面数"
            >
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="190" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              round
              type="primary"
              @click="save4(scope.row, scope.$index)"
              >保存</el-button
            >
            <el-button
              size="mini"
              round
              type="primary"
              @click="del1(scope.$index)"
              >删除</el-button
            >
            <el-button
              size="mini"
              round
              type="primary"
              @click="look(scope.row, scope.$index)"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 再次点击报价方案或者新增一条数据之后 -->
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      :style="{ height: bodyHeight - 30 + 'px' }"
      style="width: 100%; overflow: auto"
      :height="bodyHeight - 30"
      ref="editTable"
      v-show="show === 3"
    >
      <el-table-column type="index" label="序号" width="70" align="center">
      </el-table-column>
      <el-table-column
        label="皮带编号"
        width="190"
        align="center"
        prop="beltCode"
      >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.beltCode"
            placeholder="请输入皮带编号"
            clearable
            :disabled="scope.row.disabled"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column label="皮带类型" width="140" align="center" v-if="false">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.beltType1"
            placeholder="请选择皮带类型"
            @change="belt3(scope.row)"
            :disabled="scope.row.disabled"
          >
            <el-option
              v-for="item in options"
              :key="item.dictionaryKey"
              :label="item.dictionaryValue"
              :value="item.dictionaryKey"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="皮带类型" width="190" align="center">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.beltType"
            placeholder="请选择皮带类型"
            @change="belt3(scope.row)"
            :disabled="scope.row.disabled"
          >
            <el-option
              v-for="item in options"
              :key="item.dictionaryKey"
              :label="item.dictionaryValue"
              :value="item.dictionaryKey"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="长(毫米)" width="210" align="center">
        <template slot-scope="scope">
          <el-input-number
            v-model="scope.row.length"
            placeholder="请输入长度"
            clearable
            :min="0"
            :disabled="scope.row.disabled"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="宽(毫米)" width="190" align="center">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.width"
            placeholder="请选择皮带类型"
            :disabled="scope.row.disabled"
          >
            <el-option
              v-for="item in options4"
              :key="item.dictionaryKey"
              :label="item.dictionaryValue"
              :value="item.dictionaryKey"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="高度(毫米)" width="210" align="center">
        <template slot-scope="scope">
          <el-input-number
            v-model="scope.row.beginHeight"
            placeholder="请输入起始高度"
            clearable
            :min="0"
            :disabled="scope.row.disabled"
          ></el-input-number>
          <el-input-number
            v-model="scope.row.endHeight"
            placeholder="请输入终止高度"
            clearable
            :min="0"
            v-show="scope.row.end3 === 1"
            :disabled="scope.row.disabled"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="护板类型" width="150" align="center">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.guardPlateType"
            placeholder="请选择护板类型"
            :disabled="scope.row.disabled"
            @change="guardPlate(scope.row)"
          >
            <el-option
              v-for="item in options1"
              :key="item.dictionaryKey"
              :label="item.dictionaryValue"
              :value="item.dictionaryKey"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="护板面数" width="150" align="center">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.guardPlateSide"
            placeholder="请选择护板面数"
            :disabled="scope.row.disabled"
          >
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            round
            type="primary"
            @click="amend(scope.row)"
            v-show="btn === 0"
            >修改</el-button
          >
          <el-button
            size="mini"
            round
            type="primary"
            @click="chose(scope.row)"
            v-show="btn === 0"
            v-if="scope.row.beltType1 === 'mixBelt'"
            >新增</el-button
          >
          <el-button
            size="mini"
            round
            type="primary"
            @click="compute(scope.row)"
            v-show="btn === 0"
            v-if="scope.row.beltType==='riseBelt'||scope.row.beltType==='riseBeltPVK'"
            >计算</el-button
          >
          <el-button
            size="mini"
            round
            type="primary"
            @click="save3(scope.row)"
            v-show="btn === 0"
            >保存</el-button
          >
          <el-button
            size="mini"
            round
            type="primary"
            @click="look(scope.row, scope.$index)"
            >详情</el-button
          >
          <el-button
            size="mini"
            round
            type="primary"
            @click="del2(scope.$index, scope.row)"
            v-show="btn === 0"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 详情报价方案 -->
    <el-dialog title="报价方案" :visible.sync="dialogTableVisible2">
      <el-table :data="tableData1" class="kong-box">
        <el-table-column prop="beltDetailCode" label="皮带名称" width="180">
        </el-table-column>
        <el-table-column
          prop="beltDetailLength"
          label="皮带长度(毫米)"
          width="180"
        ></el-table-column>
        <el-table-column prop="length" label="水平长度(毫米)" width="180">
        </el-table-column>
        <el-table-column prop="beginHeight" label="起始高度(毫米)" width="180">
        </el-table-column>
        <el-table-column prop="endHeight" label="结束高度(毫米)" width="180">
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 计算皮带长度 -->
    <el-dialog title="计算皮带长度" :visible.sync="dialogTableVisible3">
      <el-table :data="tableData2" class="kong-box">
        <el-table-column
          prop="beltDetailLength"
          label="皮带长度(毫米)"
          width="180"
        ></el-table-column>
        <el-table-column prop="length" label="水平长度(毫米)" width="180">
        </el-table-column>
        <el-table-column prop="beginHeight" label="起始高度(毫米)" width="180">
        </el-table-column>
        <el-table-column prop="endHeight" label="结束高度(毫米)" width="180">
        </el-table-column>
        <el-table-column prop="differenceHeight" label="高度差(毫米)" width="180">
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
let that;
export default {
  components: {},
  props: {},
  data() {
    return {
      famc: "",
      falx: "",
      proposalId: "",
      proposalId1: "",
      chooselist: [],
      chooselist1: [],
      chooselist2: [],
      chooselist3: [],
      chooselist4: [],
      chooselist5: [],
      beltType: "",
      show: 1,
      shower: 1,
      btn: 0,
      data: "",
      bodyHeight: "",
      disabled: true,
      beltCode: "",
      cont: 0,
      time: 0,
      add: 0,
      OBJ: [],
      pos: 0,
      spanArr: [],
      length: "",
      width: "",
      id: "",
      key: "",
      beginHeight: "",
      endHeight: "",
      guardPlateType: "",
      guardPlateSide: "",
      prototypes: [{}],
      prototypes2: [{}],
      tableData: [{}],
      tableData1: [],
      tableData2: [{}],
      differenceHeight:0,
      beltDetailLength:0,
      afterData: [],
      objlist: [],
      try: 0,
      two: 0,
      DDD: "",
      dialogTableVisible: false,
      dialogTableVisible1: false,
      dialogTableVisible2: false,
      dialogTableVisible3: false,
      prototypes1: [
        {
          beltCode: "",
          beltType: "",
          length: "",
          width: "",
          beginHeight: "",
          endHeight: "",
          guardPlateType: "",
          guardPlateSide: "",
        },
      ],
      options: [],
      options1: [],
      options3: [],
      options4: [],
      options2: [
        {
          value: 0,
        },
        {
          value: 1,
        },
        {
          value: 2,
        },
      ],
    };
  },
  computed: {},
  methods: {
    objectSpanMethod({ rowIndex, columnIndex }) {
      //合并单元格
      if (columnIndex === 0 || columnIndex === 1) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          // _row = 0，_col = 0 表示这一次不合并，不显示，
          // _row = 2，_col = 1 表示这一次合并第一列的两行
          rowspan: _row,
          colspan: _col,
        };
      }
    },
    guardPlate(row) {
      console.log(row);
      if (row.guardPlateType === "2") {
        row.guardPlateSide = 0;
      }
    },
    compute(row){
      that.dialogTableVisible3=true
      that.differenceHeight=row.endHeight -row.beginHeight
      that.beltDetailLength=Math.floor(Math.sqrt(Math.pow(that.differenceHeight,2)+Math.pow(row.length,2))) 
      that.tableData2=[{
        length:row.length,
        beginHeight:row.beginHeight,
        endHeight:row.endHeight,
        differenceHeight:that.differenceHeight,
        beltDetailLength:that.beltDetailLength
      }]
    },
    belt(row) {
      //新增选择皮带类型
      if (row.beltType === "mixBelt") {
        this.prototypes2 = [];
        this.chooselist3 = [];
        this.cont++;
        this.data = 1;
        this.dialogTableVisible = true;
        sessionStorage.setItem("beltcode", row.beltCode);
        sessionStorage.setItem("beltType", row.beltType);
      } else if (
        row.beltType === "horizontalBeltPVC" ||
        row.beltType === "horizontalBeltPVK"
      ) {
        row.end = 0;
      } else if (
        row.beltType === "riseBelt" ||
        row.beltType === "riseBeltPVK"
      ) {
        row.end = 1;
      }
    },
    belt3(row) {
      //编辑选择皮带类型
      if (row.beltType === "mixBelt") {
        this.prototypes2 = [];
        this.chooselist3 = [];
        this.cont++;
        this.data = 1;
        this.dialogTableVisible1 = true;
        sessionStorage.setItem("beltcode", row.beltCode);
        sessionStorage.setItem("beltType", row.beltType);
      } else if (
        row.beltType === "horizontalBeltPVC" ||
        row.beltType === "horizontalBeltPVK"
      ) {
        row.end3 = 0;
      } else if (
        row.beltType === "riseBelt" ||
        row.beltType === "riseBeltPVK"
      ) {
        row.end3 = 1;
      }
    },
    belt1(row) {
      //新增组合皮带的皮带类型
      if (
        row.beltType === "horizontalBeltPVC" ||
        row.beltType === "horizontalBeltPVK"
      ) {
        row.end1 = 0;
      } else if (
        row.beltType === "riseBelt" ||
        row.beltType === "riseBeltPVK"
      ) {
        row.end1 = 1;
      }
    },
    belt4(row) {
      //编辑组合皮带的皮带类型
      if (
        row.beltType === "horizontalBeltPVC" ||
        row.beltType === "horizontalBeltPVK"
      ) {
        row.end4 = 0;
      } else if (
        row.beltType === "riseBelt" ||
        row.beltType === "riseBeltPVK"
      ) {
        row.end4 = 1;
      }
    },
    geteer() {
      //皮带类型的接口
      that
        .$post("dictionary/getDictionaryList", {
          dictionaryType: "belt_type",
        })
        .then(function (data) {
          // console.log(data);
          if (data && data.code == "0000") {
            that.options = data.data;
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    geteer1() {
      that
        .$post("dictionary/getDictionaryList", {
          dictionaryType: "guard_plate_type",
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.options1 = data.data;
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    geteer2() {
      that
        .$post("dictionary/getDictionaryList", {
          dictionaryType: "belt_type",
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.options3.push(data.data[0]);
            that.options3.push(data.data[1]);
            that.options3.push(data.data[3]);
            that.options3.push(data.data[4]);
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    geteer3() {
      that
        .$post("dictionary/getDictionaryList", {
          dictionaryType: "belt_width",
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.options4 = data.data;
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    getdata() {
      if (sessionStorage.getItem("btn") === "0") {
        //判断编辑or详情
        this.btn = 0;
      } else {
        this.btn = 1;
      }
      if (JSON.parse(sessionStorage.getItem("obj")).length !== 0) {
        if (sessionStorage.getItem("show") === "1") {
          this.show = 2;
          this.shower = 2;
          this.famc = JSON.parse(sessionStorage.getItem("obj"))[0].name;
          this.falx =
            JSON.parse(sessionStorage.getItem("obj"))[0].type === "1"
              ? "总部报价方案"
              : "普通报价方案";
          (this.proposalId = JSON.parse(
            sessionStorage.getItem("obj")
          )[0].proposalId),
            (this.prototypes1 = JSON.parse(sessionStorage.getItem("obj")));
        } else if (sessionStorage.getItem("show") === "2") {
          //第一次进入新增报价页面传过来的
          this.show = 1;
          this.shower = 1;
          this.famc = this.$route.query.name;
          this.falx =
            this.$route.query.type === "1" ? "总部报价方案" : "普通报价方案";
          this.proposalId = this.$route.query.id;
        } else if (sessionStorage.getItem("show") === "3") {
          //再次进入或者新增了一条数据
          this.show = 3;
          this.shower = 1;
          this.famc = JSON.parse(sessionStorage.getItem("obj")).name;
          this.falx =
            JSON.parse(sessionStorage.getItem("obj")).type === "1"
              ? "总部报价方案"
              : "普通报价方案";
          for (
            let i = 0;
            i <
            JSON.parse(sessionStorage.getItem("obj")).beltInfoDTOList.length;
            i++
          ) {
            if (
              JSON.parse(sessionStorage.getItem("obj")).beltInfoDTOList[i]
                .sonBeltInfoDTOList === null
            ) {
              let obj = {
                beltCode: JSON.parse(sessionStorage.getItem("obj"))
                  .beltInfoDTOList[i].beltCode,
                beltType1: null,
                beltType: JSON.parse(sessionStorage.getItem("obj"))
                  .beltInfoDTOList[i].beltType,
                beginHeight: JSON.parse(sessionStorage.getItem("obj"))
                  .beltInfoDTOList[i].beginHeight,
                endHeight: JSON.parse(sessionStorage.getItem("obj"))
                  .beltInfoDTOList[i].endHeight,
                guardPlateType: JSON.parse(sessionStorage.getItem("obj"))
                  .beltInfoDTOList[i].guardPlateType,
                guardPlateSide: JSON.parse(sessionStorage.getItem("obj"))
                  .beltInfoDTOList[i].guardPlateSide,
                length: JSON.parse(sessionStorage.getItem("obj"))
                  .beltInfoDTOList[i].length,
                name: JSON.parse(sessionStorage.getItem("obj")).name,
                parentId: JSON.parse(sessionStorage.getItem("obj"))
                  .beltInfoDTOList[i].parentId,
                proposalId: JSON.parse(sessionStorage.getItem("obj"))
                  .beltInfoDTOList[i].proposalId,
                proposalId1: JSON.parse(sessionStorage.getItem("obj"))
                  .beltInfoDTOList[i].proposalId,
                type: JSON.parse(sessionStorage.getItem("obj")).type,
                width: JSON.parse(sessionStorage.getItem("obj"))
                  .beltInfoDTOList[i].width,
                end: 0,
                end3: 0,
                disabled: true,
                id: JSON.parse(sessionStorage.getItem("obj")).beltInfoDTOList[i]
                  .id,
              };
              this.chooselist4.push(obj);
            } else {
              for (
                let j = 0;
                j <
                JSON.parse(sessionStorage.getItem("obj")).beltInfoDTOList[i]
                  .sonBeltInfoDTOList.length;
                j++
              ) {
                let obj = {
                  beltCode: JSON.parse(sessionStorage.getItem("obj"))
                    .beltInfoDTOList[i].beltCode,
                  beltType1: JSON.parse(sessionStorage.getItem("obj"))
                    .beltInfoDTOList[i].beltType,
                  beltType: JSON.parse(sessionStorage.getItem("obj"))
                    .beltInfoDTOList[i].sonBeltInfoDTOList[j].beltType,
                  beginHeight: JSON.parse(sessionStorage.getItem("obj"))
                    .beltInfoDTOList[i].sonBeltInfoDTOList[j].beginHeight,
                  endHeight: JSON.parse(sessionStorage.getItem("obj"))
                    .beltInfoDTOList[i].sonBeltInfoDTOList[j].endHeight,
                  guardPlateType: JSON.parse(sessionStorage.getItem("obj"))
                    .beltInfoDTOList[i].sonBeltInfoDTOList[j].guardPlateType,
                  guardPlateSide: JSON.parse(sessionStorage.getItem("obj"))
                    .beltInfoDTOList[i].sonBeltInfoDTOList[j].guardPlateSide,
                  length: JSON.parse(sessionStorage.getItem("obj"))
                    .beltInfoDTOList[i].sonBeltInfoDTOList[j].length,
                  name: JSON.parse(sessionStorage.getItem("obj")).name,
                  parentId: JSON.parse(sessionStorage.getItem("obj"))
                    .beltInfoDTOList[i].sonBeltInfoDTOList[j].parentId,
                  proposalId: JSON.parse(sessionStorage.getItem("obj"))
                    .beltInfoDTOList[i].sonBeltInfoDTOList[j].proposalId,
                  proposalId1: JSON.parse(sessionStorage.getItem("obj"))
                    .beltInfoDTOList[i].proposalId,
                  type: JSON.parse(sessionStorage.getItem("obj")).type,
                  width: JSON.parse(sessionStorage.getItem("obj"))
                    .beltInfoDTOList[i].sonBeltInfoDTOList[j].width,
                  end: 0,
                  end3: 0,
                  disabled: true,
                  id: JSON.parse(sessionStorage.getItem("obj")).beltInfoDTOList[
                    i
                  ].id,
                };
                this.chooselist4.push(obj);
              }
            }
          }
          // console.log(this.chooselist4);表格每一行的数据
          this.tableData = this.chooselist4;
        }
        for (var i = 0; i < this.tableData.length; i++) {
          if (
            this.tableData[i].beltType === "riseBelt" ||
            this.tableData[i].beltType === "riseBeltPVK"
          ) {
            this.tableData[i].end3 = 1; //判断是否有起始高度跟终止高度
          } else if (
            this.tableData[i].beltType === "horizontalBeltPVC" ||
            this.tableData[i].beltType === "horizontalBeltPVK"
          ) {
            this.tableData[i].end3 = 0;
          }
          if (this.tableData[i].beltType1 === "mixBelt") {
            //判断是组合皮带的就实行合并
            if (i === 0) {
              this.spanArr.push(1);
              this.pos = 0;
            } else {
              //判断当前元素与上一个元素是否相同
              //这里的groupName是第一列的属性，我用来判断是否相同。
              if (
                this.tableData[i].parentId === this.tableData[i - 1].parentId
              ) {
                this.spanArr[this.pos] += 1;
                this.spanArr.push(0);
              } else {
                this.spanArr.push(1);
                this.pos = i;
              }
            }
          } else {
            this.spanArr.push(1);
          }
        }
        for (let z = 0; z < this.tableData.length; z++) {
          if (
            this.tableData[z].beltType === "horizontalBeltPVK" ||
            this.tableData[z].beltType === "horizontalBeltPVC"
          ) {
            this.tableData[z].end = 1;
          }
        }
      }
      for (let i = 0; i < this.tableData.length; i++) {
        //相同的合并起来
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].beltType1 === "mixBelt") {
            //组合皮带跟普通皮带进行分类收取
            this.chooselist5[i] = this.tableData[i];
          } else {
            this.afterData.push(this.tableData[i]);
          }
        }
        // console.log(this.afterData);
        // 先收集表格每一行中不是组合皮带的数据
        // console.log(this.chooselist5);
        // 收集表格每一行中的组合皮带
        let tempArr = [];
        for (let j = 0; j < this.chooselist5.length; j++) {
          if (tempArr.indexOf(this.chooselist5[j].parentId) === -1) {
            //当组合皮带的parentId相同时合并
            this.afterData.push({
              parentId: this.chooselist5[j].parentId,
              sonBeltInfoDTOStr: [this.chooselist5[j]],
            });
            tempArr.push(this.chooselist5[j].parentId);
          } else {
            for (let jj = 0; jj < this.afterData.length; jj++) {
              if (this.afterData[jj].parentId == this.chooselist5[j].parentId) {
                this.afterData[jj].sonBeltInfoDTOStr.push(this.chooselist5[j]);
                break;
              }
            }
          }
        }
        let obj = JSON.parse(sessionStorage.getItem("obj"));
        for (let i = 0; i < obj.beltInfoDTOList.length; i++) {
          for (let j = 0; j < this.afterData.length; j++) {
            if (obj.beltInfoDTOList[i].id === this.afterData[j].parentId) {
              obj.beltInfoDTOList[i].sonBeltInfoDTOStr =
                this.afterData[j].sonBeltInfoDTOStr;
              obj.beltInfoDTOList[i].sonBeltInfoDTOList = null;
            }
          }
        }
        obj.beltInfoDTOListStr = obj.beltInfoDTOList;
        obj.beltInfoDTOList = null;
        this.OBJ = obj.beltInfoDTOListStr;
        console.log(this.OBJ)
      }
      this.afterData = [];
      let tempArr = [];
      for (let j = 0; j < this.chooselist5.length; j++) {
        if (tempArr.indexOf(this.chooselist5[j].parentId) === -1) {
          //当组合皮带的parentId相同时合并
          this.afterData.push({
            parentId: this.chooselist5[j].parentId,
            sonBeltInfoDTOStr: [this.chooselist5[j]],
          });
          tempArr.push(this.chooselist5[j].parentId);
        } else {
          for (let jj = 0; jj < this.afterData.length; jj++) {
            if (this.afterData[jj].parentId == this.chooselist5[j].parentId) {
              this.afterData[jj].sonBeltInfoDTOStr.push(this.chooselist5[j]);
              break;
            }
          }
        }
      }
    },
    //点击修改,修改的一行显示可修改
    amend(row) {
      row.disabled = false;
    },
    //只有组合皮带才有新增按钮
    chose(row) {
      if (row.beltType1 === "mixBelt") {
        this.dialogTableVisible1 = true;
        that.prototypes2 = []; //清空组合弹框的表格数据
        for (let i = 0; i < this.tableData.length; i++) {
          if (row.parentId === this.tableData[i].parentId) {
            // console.log(row.parentId);
            this.key = row.parentId;
            sessionStorage.setItem("ROW", JSON.stringify(row));
            this.try = 1;
          }
        }
      }
    },
    addziduan() {
      // 向表格数组中数据添加一行
      this.prototypes.push({
        index: this.prototypes.length,
      });
      this.tableData.push({
        index: this.tableData.length,
      });
      //新增一条数据自动移动到表格最下面
      this.$nextTick(() => {
        this.$refs.editTable.bodyWrapper.scrollTop =
          this.$refs.editTable.bodyWrapper.scrollHeight;
      })
      this.add = 1;
      this.try = 0;
      this.two = 0;
      this.chooselist = [];
      this.spanArr.push(1);
    },
    del(index) {
      this.prototypes.splice(index, 1); //删除弹窗新增的一行数据不刷新页面
    },
    del2(index, row) {
      //删除一行并同时刷新页面,重新进入new
      this.tableData.splice(index, 1);
      if (this.tableData.length === 0) {
        this.chooselist = [];
        that
          .$post("pricingProposal/editPricingProposal", {
            id: row.proposalId,
            beltInfoDTOListStr: JSON.stringify(this.chooselist),
          })
          .then(function (data) {
            if (data && data.code == "0000") {
              // that.getdata();
              // console.log(data.data);
            } else {
              that.$message({
                message: data.msg,
                type: "warning",
              });
            }
          });
      } else {
        this.chooselist1 = [];
        this.chooselist2 = [];
        this.chooselist3 = [];
        this.chooselist5 = [];
        this.afterData = [];
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].beltType1 === "mixBelt") {
            this.chooselist5[i] = this.tableData[i];
          } else {
            this.afterData.push(this.tableData[i]);
          }
        }
        let tempArr = [];
        for (let j = 0; j < this.chooselist5.length; j++) {
          if (tempArr.indexOf(this.chooselist5[j].parentId) === -1) {
            //将相同的数据合并
            this.afterData.push({
              parentId: this.chooselist5[j].parentId,
              sonBeltInfoDTOStr: [this.chooselist5[j]],
            });
            tempArr.push(this.chooselist5[j].parentId);
          } else {
            for (let jj = 0; jj < this.afterData.length; jj++) {
              if (this.afterData[jj].parentId == this.chooselist5[j].parentId) {
                this.afterData[jj].sonBeltInfoDTOStr.push(this.chooselist5[j]);
                break;
              }
            }
          }
        }
        let obj = JSON.parse(sessionStorage.getItem("obj"));
        for (let i = 0; i < obj.beltInfoDTOList.length; i++) {
          for (let j = 0; j < this.afterData.length; j++) {
            if (obj.beltInfoDTOList[i].id === this.afterData[j].parentId) {
              this.afterData.forEach((item) => {
                this.$set(
                  item,
                  "proposalId",
                  obj.beltInfoDTOList[0].proposalId
                ); //给对象新增一个属性
              });
              this.afterData[j].beltCode = obj.beltInfoDTOList[i].beltCode;
              this.afterData[j].beltType = obj.beltInfoDTOList[i].beltType;
              this.afterData[j].proposalId = obj.beltInfoDTOList[i].proposalId;
              this.afterData[j].id = this.afterData[j].parentId;
              this.afterData[j].parentId = null;
            }
          }
        }
        this.OBJ = this.afterData;
        this.id = this.$route.query.proposalId;
        that
          .$post("pricingProposal/editPricingProposal", {
            id: this.$route.query.proposalId,
            beltInfoDTOListStr: JSON.stringify(this.OBJ),
          })
          .then(function (data) {
            if (data && data.code == "0000") {
              that
                .$post("pricingProposal/getPricingProposalDetail", {
                  id: that.id,
                })
                .then(function (data) {
                  if (data && data.code == "0000") {
                    if (data.data.beltInfoDTOList.length !== 0) {
                      for (
                        let i = 0;
                        i < data.data.beltInfoDTOList.length;
                        i++
                      ) {
                        sessionStorage.setItem(
                          "obj",
                          JSON.stringify(data.data)
                        );
                        sessionStorage.setItem("show", 3);
                      }
                    } else {
                      sessionStorage.setItem("obj", JSON.stringify(data.data));
                      sessionStorage.setItem("show", 3);
                    }
                    that.$router.push({
                      name: "new",
                      query: {
                        list: that.List,
                        proposalId: data.data.id,
                        id: that.id,
                      },
                    });
                    that.chooselist4 = [];
                    that.tableData = [];
                    that.afterData = [];
                    that.spanArr = [];
                    that.chooselist5 = [];
                    that.getdata();
                  } else {
                    that.$message({
                      message: data.msg,
                      type: "warning",
                    });
                  }
                }); //编辑里面的详情接口数据表格
            } else {
              that.$message({
                message: data.msg,
                type: "warning",
              });
            }
          });
      }
    },
    addziduan1() {
      // 向表格数组中数据添加一行
      this.prototypes2.push({
        index: this.prototypes2.length,
      });
      this.$nextTick(() => {
        this.$refs.editTable.bodyWrapper.scrollTop =
          this.$refs.editTable.bodyWrapper.scrollHeight;
      })
    },
    del1(index) {
      this.prototypes2.splice(index, 1);
    },
    save(row) {
      console.log(this.$route.query.id);
      this.DDD = this.$route.query.id;
      let obj = {
        proposalId: this.proposalId,
        beltCode: row.beltCode,
        beltType: row.beltType,
        length: row.length,
        width: row.width,
        beginHeight: row.beginHeight,
        endHeight: row.endHeight,
        guardPlateType: row.guardPlateType,
        guardPlateSide: row.guardPlateSide,
      };
      this.chooselist.push(obj);
      that
        .$post("pricingProposal/editPricingProposal", {
          id: this.$route.query.id,
          beltInfoDTOListStr: JSON.stringify(this.chooselist),
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            // that.getdata();
            // console.log(data.data);
            that
              .$post("pricingProposal/getPricingProposalDetail", {
                id: that.$route.query.id,
              })
              .then(function (data) {
                if (data && data.code == "0000") {
                  if (data.data.beltInfoDTOList.length !== 0) {
                    for (let i = 0; i < data.data.beltInfoDTOList.length; i++) {
                      sessionStorage.setItem("obj", JSON.stringify(data.data));
                      sessionStorage.setItem("show", 3);
                    }
                  } else {
                    sessionStorage.setItem("obj", JSON.stringify(data.data));
                    sessionStorage.setItem("show", 3);
                  }
                  that.$router.push({
                    name: "new",
                    query: {
                      list: that.List,
                      proposalId: data.data.id,
                      id: row.id,
                    },
                  });
                  that.getdata();
                } else {
                  that.$message({
                    message: data.msg,
                    type: "warning",
                  });
                }
              }); //编辑里面的详情接口数据表格
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    save1(row) {
      row.disabled = false;
      for (let i = 0; i < this.prototypes1.length; i++) {
        if (row === this.prototypes1[i]) {
          this.prototypes1[i] = {
            proposalId: this.$route.query.proposalId,
            beltCode: row.beltCode,
            beltType: row.beltType,
            length: row.length,
            width: row.width,
            beginHeight: row.beginHeight,
            endHeight: row.endHeight,
            guardPlateType: row.guardPlateType,
            guardPlateSide: row.guardPlateSide,
          };
        }
      }
      that
        .$post("pricingProposal/editPricingProposal", {
          id: this.proposalId,
          beltInfoDTOListStr: JSON.stringify(this.prototypes1),
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            // that.getdata();
            // console.log(data.data);
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    save2(row) {
      this.time++;
      if (this.cont === 1) {
        //外部点击组合皮带的时候
        let obj1 = {
          proposalId: this.$route.query.id,
          beltCode: sessionStorage.getItem("beltcode"),
          beltType: sessionStorage.getItem("beltType"),
          sonBeltInfoDTOStr: this.chooselist1,
        };
        for (let dd = 0; dd < this.prototypes2.length; dd++) {
          let obj2 = {
            beltCode: sessionStorage.getItem("beltcode"),
            beltType: this.prototypes2[dd].beltType,
            length: this.prototypes2[dd].length,
            width: this.prototypes2[dd].width,
            beginHeight: this.prototypes2[dd].beginHeight,
            endHeight: this.prototypes2[dd].endHeight,
            guardPlateType: this.prototypes2[dd].guardPlateType,
            guardPlateSide: this.prototypes2[dd].guardPlateSide,
          };
          this.chooselist1.push(obj2);
        }
        if (this.time === 1) {
          this.chooselist.push(obj1);
          this.time++;
        }
      } else {
        //组合皮带里面弹窗
        let obj1 = {
          proposalId: this.$route.query.id,
          beltCode: sessionStorage.getItem("beltcode"),
          beltType: sessionStorage.getItem("beltType"),
          sonBeltInfoDTOStr: this.chooselist3,
        };
        for (let dd = 0; dd < this.prototypes2.length; dd++) {
          let obj2 = {
            beltCode: sessionStorage.getItem("beltcode"),
            beltType: this.prototypes2[dd].beltType,
            length: this.prototypes2[dd].length,
            width: this.prototypes2[dd].width,
            beginHeight: this.prototypes2[dd].beginHeight,
            endHeight: this.prototypes2[dd].endHeight,
            guardPlateType: this.prototypes2[dd].guardPlateType,
            guardPlateSide: this.prototypes2[dd].guardPlateSide,
          };
          this.chooselist3.push(obj2);
        }
        if (this.data === 1) {
          //将大的一层push进参数数组中
          this.chooselist.push(obj1);
          this.data = 0;
        }
        this.cont = 0;
        this.time = 0;
      }
      console.log(this.chooselist);
      sessionStorage.setItem("chooselist2", this.chooselist);
      console.log(this.chooselist2);
      that
        .$post("pricingProposal/editPricingProposal", {
          id: this.$route.query.id,
          beltInfoDTOListStr: JSON.stringify(this.chooselist),
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.dialogTableVisible1 = false;
            that
              .$post("pricingProposal/getPricingProposalDetail", {
                id: that.$route.query.id,
              })
              .then(function (data) {
                if (data && data.code == "0000") {
                  if (data.data.beltInfoDTOList.length !== 0) {
                    for (let i = 0; i < data.data.beltInfoDTOList.length; i++) {
                      sessionStorage.setItem("obj", JSON.stringify(data.data));
                      sessionStorage.setItem("show", 3);
                    }
                  } else {
                    sessionStorage.setItem("obj", JSON.stringify(data.data));
                    sessionStorage.setItem("show", 3);
                  }
                  that.$router.push({
                    name: "new",
                    query: {
                      list: that.List,
                      proposalId: data.data.id,
                      id: row.id,
                    },
                  });
                  that.getdata();
                } else {
                  that.$message({
                    message: data.msg,
                    type: "warning",
                  });
                }
              }); //编辑里面的详情接口数据表格
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
    save3(row) {
      if (
        row.beltCode === undefined ||
        row.beltType === undefined ||
        row.length === undefined ||
        row.width === undefined ||
        row.beginHeight === undefined ||
        row.guardPlateType === undefined ||
        row.guardPlateSide === undefined
      ) {
        this.$message({
          showClose: true,
          message: "请检查是否完整",
          type: "warning",
        });
      } else {
        row.disabled = true;
        //编辑没有新增没有组合皮带的时候
        this.chooselist1 = [];
        this.chooselist2 = [];
        this.chooselist3 = [];
        this.chooselist5 = [];
        this.afterData = [];
        for (let i = 0; i < this.tableData.length; i++) {
          if (row === this.tableData[i]) {
            this.tableData[i] = {
              proposalId: this.$route.query.proposalId,
              proposalId1: row.proposalId1,
              beltCode: row.beltCode,
              beltType: row.beltType,
              beltType1: row.beltType1,
              length: row.length,
              width: row.width,
              parentId: row.parentId,
              beginHeight: row.beginHeight,
              endHeight: row.endHeight,
              guardPlateType: row.guardPlateType,
              guardPlateSide: row.guardPlateSide,
            };
            for (let i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i].beltType1 === "mixBelt") {
                this.chooselist5[i] = this.tableData[i];
              } else {
                this.afterData.push(this.tableData[i]);
              }
            }
            let tempArr = [];
            for (let j = 0; j < this.chooselist5.length; j++) {
              if (tempArr.indexOf(this.chooselist5[j].parentId) === -1) {
                this.afterData.push({
                  parentId: this.chooselist5[j].parentId,
                  sonBeltInfoDTOStr: [this.chooselist5[j]],
                });
                console.log(this.afterData);
                tempArr.push(this.chooselist5[j].parentId);
              } else {
                for (let jj = 0; jj < this.afterData.length; jj++) {
                  if (
                    this.afterData[jj].parentId == this.chooselist5[j].parentId
                  ) {
                    this.afterData[jj].sonBeltInfoDTOStr.push(
                      this.chooselist5[j]
                    );
                    break;
                  }
                }
              }
            }
            let list = [];
            let obj = JSON.parse(sessionStorage.getItem("obj"));
            for (let i = 0; i < obj.beltInfoDTOList.length; i++) {
              for (let j = 0; j < this.afterData.length; j++) {
                if (obj.beltInfoDTOList[i].id === this.afterData[j].parentId) {
                  this.afterData.forEach((item) => {
                    this.$set(
                      item,
                      "proposalId",
                      obj.beltInfoDTOList[0].proposalId
                    );
                  });
                  list.push(this.afterData[j]);
                  this.afterData[j].beltCode = obj.beltInfoDTOList[i].beltCode;
                  this.afterData[j].beltType = obj.beltInfoDTOList[i].beltType;
                  this.afterData[j].proposalId =
                    obj.beltInfoDTOList[i].proposalId;
                  this.afterData[j].id = this.afterData[j].parentId;
                  this.afterData[j].parentId = null;
                }
              }
            }
            for (let yy = 0; yy < list.length; yy++) {
              if (row.parentId === list[yy].id) {
                list[yy].beltCode = row.beltCode;
              }
            }
            this.OBJ = this.afterData;
          }
        }
        let tempArr = [];
        for (let tt = 0; tt < this.afterData.length; tt++) {
          if (this.afterData[tt].beltType === "mixBelt") {
            if (tempArr.indexOf(this.afterData[tt].parentId) === -1) {
              tempArr.push(this.afterData[tt]);
              for (
                let t = 0;
                t < this.afterData[tt].sonBeltInfoDTOStr.length;
                t++
              ) {
                this.afterData[tt].sonBeltInfoDTOStr[t].beltCode =
                  this.afterData[tt].beltCode + "-" + t;
              }
            }
          }
        }
        console.log(this.afterData);
        this.id = this.$route.query.proposalId;
        that
          .$post("pricingProposal/editPricingProposal", {
            id: this.$route.query.proposalId,
            beltInfoDTOListStr: JSON.stringify(this.OBJ),
          })
          .then(function (data) {
            if (data && data.code == "0000") {
              that
                .$post("pricingProposal/getPricingProposalDetail", {
                  id: that.id,
                })
                .then(function (data) {
                  if (data && data.code == "0000") {
                    if (data.data.beltInfoDTOList.length !== 0) {
                      for (
                        let i = 0;
                        i < data.data.beltInfoDTOList.length;
                        i++
                      ) {
                        sessionStorage.setItem(
                          "obj",
                          JSON.stringify(data.data)
                        );
                        sessionStorage.setItem("show", 3);
                      }
                    } else {
                      sessionStorage.setItem("obj", JSON.stringify(data.data));
                      sessionStorage.setItem("show", 3);
                    }
                    that.$router.push({
                      name: "new",
                      query: {
                        list: that.List,
                        proposalId: data.data.id,
                        id: row.id,
                      },
                    });
                    that.chooselist4 = [];
                    that.tableData = [];
                    that.afterData = [];
                    that.spanArr = [];
                    that.chooselist5 = [];
                    that.getdata();
                  } else {
                    that.$message({
                      message: data.msg,
                      type: "warning",
                    });
                  }
                }); //编辑里面的详情接口数据表格
            } else {
              that.$message({
                message: data.msg,
                type: "warning",
              });
            }
          });
      }

      // }
    },
    getdata1() {
      for (let i = 0; i < this.tableData.length - 1; i++) {
        if (this.tableData[i].beltType1 === "mixBelt") {
          this.chooselist5[i] = this.tableData[i];
        } else {
          this.afterData.push(this.tableData[i]);
        }
      }
      let tempArr = [];
      for (let j = 0; j < this.chooselist5.length; j++) {
        if (tempArr.indexOf(this.chooselist5[j].parentId) === -1) {
          this.afterData.push({
            parentId: this.chooselist5[j].parentId,
            sonBeltInfoDTOStr: [this.chooselist5[j]],
          });
          tempArr.push(this.chooselist5[j].parentId);
        } else {
          for (let jj = 0; jj < this.afterData.length; jj++) {
            if (this.afterData[jj].parentId == this.chooselist5[j].parentId) {
              this.afterData[jj].sonBeltInfoDTOStr.push(this.chooselist5[j]);
              break;
            }
          }
        }
      }
      let obj = JSON.parse(sessionStorage.getItem("obj"));
      for (let i = 0; i < obj.beltInfoDTOList.length; i++) {
        for (let j = 0; j < this.afterData.length; j++) {
          if (obj.beltInfoDTOList[i].id === this.afterData[j].parentId) {
            this.afterData.forEach((item) => {
              this.$set(item, "proposalId", obj.beltInfoDTOList[0].proposalId);
            });
            this.afterData[j].beltCode = obj.beltInfoDTOList[i].beltCode;
            this.afterData[j].beltType = obj.beltInfoDTOList[i].beltType;
            this.afterData[j].proposalId = obj.beltInfoDTOList[i].proposalId;
            this.afterData[j].id = this.afterData[j].parentId;
            this.afterData[j].parentId = null;
          }
        }
      }
      this.OBJ = this.afterData;
    },
    save4(row) {
      if (
        row.beltType === undefined ||
        row.length === undefined ||
        row.width === undefined ||
        row.beginHeight === undefined ||
        row.guardPlateType === undefined ||
        row.guardPlateSide === undefined
      ) {
        this.$message({
          showClose: true,
          message: "请检查是否完整",
          type: "warning",
        });
      } else {
        this.afterData = [];
        if (this.try === 1) {
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].beltType1 === "mixBelt") {
              this.chooselist5[i] = this.tableData[i];
            } else {
              this.afterData.push(this.tableData[i]);
            }
          }
          let tempArr = [];
          for (let j = 0; j < this.chooselist5.length; j++) {
            if (tempArr.indexOf(this.chooselist5[j].parentId) === -1) {
              this.afterData.push({
                parentId: this.chooselist5[j].parentId,
                sonBeltInfoDTOStr: [this.chooselist5[j]],
              });
              tempArr.push(this.chooselist5[j].parentId);
            } else {
              for (let jj = 0; jj < this.afterData.length; jj++) {
                if (
                  this.afterData[jj].parentId == this.chooselist5[j].parentId
                ) {
                  this.afterData[jj].sonBeltInfoDTOStr.push(
                    this.chooselist5[j]
                  );
                  break;
                }
              }
            }
          }
          let obj = JSON.parse(sessionStorage.getItem("obj"));
          for (let i = 0; i < obj.beltInfoDTOList.length; i++) {
            for (let j = 0; j < this.afterData.length; j++) {
              if (obj.beltInfoDTOList[i].id === this.afterData[j].parentId) {
                this.afterData.forEach((item) => {
                  this.$set(
                    item,
                    "proposalId",
                    obj.beltInfoDTOList[0].proposalId
                  );
                });
                this.afterData[j].beltCode = obj.beltInfoDTOList[i].beltCode;
                this.afterData[j].beltType = obj.beltInfoDTOList[i].beltType;
                this.afterData[j].proposalId =
                  obj.beltInfoDTOList[i].proposalId;
                this.afterData[j].id = this.afterData[j].parentId;
                this.afterData[j].parentId = null;
              }
            }
          }
          this.OBJ = this.afterData;
          for (let zz = 0; zz < this.OBJ.length; zz++) {
            if (this.OBJ[zz].id === this.key) {
              console.log(this.prototypes2);
              for (let dd = 0; dd < this.prototypes2.length; dd++) {
                let obj3 = {
                  beltCode: this.OBJ[zz].beltCode,
                  beltType: this.prototypes2[dd].beltType,
                  length: this.prototypes2[dd].length,
                  width: this.prototypes2[dd].width,
                  beginHeight: this.prototypes2[dd].beginHeight,
                  endHeight: this.prototypes2[dd].endHeight,
                  guardPlateType: this.prototypes2[dd].guardPlateType,
                  guardPlateSide: this.prototypes2[dd].guardPlateSide,
                };
                this.OBJ[zz].sonBeltInfoDTOStr.push(obj3);
              }
              console.log(this.OBJ[zz].sonBeltInfoDTOStr);
            }
          }
          console.log(this.OBJ);
        }
        //编辑新增有组合皮带的时候
        this.chooselist3 = [];
        if (this.add !== 0) {
          this.getdata1();
          this.time++;
          if (this.cont === 1) {
            //当皮带选择为组合皮带的时候
            let obj1 = {
              proposalId: this.$route.query.proposalId,
              beltCode: sessionStorage.getItem("beltcode"),
              beltType: sessionStorage.getItem("beltType"),
              sonBeltInfoDTOStr: this.chooselist1,
            };
            for (let dd = 0; dd < this.prototypes2.length; dd++) {
              let obj2 = {
                beltCode: sessionStorage.getItem("beltcode"),
                beltType: this.prototypes2[dd].beltType,
                length: this.prototypes2[dd].length,
                width: this.prototypes2[dd].width,
                beginHeight: this.prototypes2[dd].beginHeight,
                endHeight: this.prototypes2[dd].endHeight,
                guardPlateType: this.prototypes2[dd].guardPlateType,
                guardPlateSide: this.prototypes2[dd].guardPlateSide,
              };
              this.chooselist1.push(obj2);
            }
            if (this.time === 1) {
              this.chooselist.push(obj1);
              this.time++;
            }
          } else {
            let obj1 = {
              proposalId: this.$route.query.proposalId,
              beltCode: sessionStorage.getItem("beltcode"),
              beltType: sessionStorage.getItem("beltType"),
              sonBeltInfoDTOStr: this.chooselist3,
            };
            for (let dd = 0; dd < this.prototypes2.length; dd++) {
              let obj2 = {
                beltCode: sessionStorage.getItem("beltcode"),
                beltType: this.prototypes2[dd].beltType,
                length: this.prototypes2[dd].length,
                width: this.prototypes2[dd].width,
                beginHeight: this.prototypes2[dd].beginHeight,
                endHeight: this.prototypes2[dd].endHeight,
                guardPlateType: this.prototypes2[dd].guardPlateType,
                guardPlateSide: this.prototypes2[dd].guardPlateSide,
              };
              this.chooselist3.push(obj2);
            }
            if (this.data === 1) {
              //外层的push进接口参数中
              this.chooselist.push(obj1);
              this.data = 0;
            }
            this.cont = 0;
            this.time = 0;
          }
          // console.log(this.chooselist);
          sessionStorage.setItem("chooselist2", this.chooselist);
          if (this.two === 0) {
            this.OBJ = this.OBJ.concat(this.chooselist); //数组结合
            this.two++;
          }
          this.add = 0;
        }
        console.log(this.OBJ);
        this.id = this.$route.query.proposalId;
        that
          .$post("pricingProposal/editPricingProposal", {
            //组合皮带弹框里面的保存按钮
            id: this.$route.query.proposalId,
            beltInfoDTOListStr: JSON.stringify(this.OBJ),
          })
          .then(function (data) {
            if (data && data.code == "0000") {
              that
                .$post("pricingProposal/getPricingProposalDetail", {
                  //重新进入new页面刷新数据
                  id: that.id,
                })
                .then(function (data) {
                  if (data && data.code == "0000") {
                    if (data.data.beltInfoDTOList.length !== 0) {
                      for (
                        let i = 0;
                        i < data.data.beltInfoDTOList.length;
                        i++
                      ) {
                        sessionStorage.setItem(
                          "obj",
                          JSON.stringify(data.data)
                        );
                        sessionStorage.setItem("show", 3);
                      }
                    } else {
                      sessionStorage.setItem("obj", JSON.stringify(data.data));
                      sessionStorage.setItem("show", 3);
                    }
                    that.$router.push({
                      name: "new",
                      query: {
                        list: that.List,
                        proposalId: data.data.id,
                        id: row.id,
                      },
                    });
                    that.chooselist4 = [];
                    that.tableData = [];
                    that.afterData = [];
                    that.spanArr = [];
                    that.chooselist5 = [];
                    that.getdata();
                    // that.chose(row);
                  } else {
                    that.$message({
                      message: data.msg,
                      type: "warning",
                    });
                  }
                }); //编辑里面的详情接口数据表格
            } else {
              that.$message({
                message: data.msg,
                type: "warning",
              });
            }
          });
        this.dialogTableVisible1 = false;
      }
      //弹窗里面的保存按钮
    },
    look(row) {
      //编辑里面的详情接口数据表格
      this.dialogTableVisible2 = true;
      that
        .$post("beltInfo/getBeltInfoDetail", {
          beltId: row.id,
        })
        .then(function (data) {
          if (data && data.code == "0000") {
            that.tableData1 = data.data;
          } else {
            that.$message({
              message: data.msg,
              type: "warning",
            });
          }
        });
    },
  },
  watch: {},
  created() {
    this.getdata();
  },
  mounted() {
    that = this;
    that.bodyHeight = window.innerHeight - 124;
    that.geteer();
    that.geteer1();
    that.geteer2();
    that.geteer3();
    that.getdata1();
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/adminpages/ytGridScheme.scss";
</style>