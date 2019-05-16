<template>
  <div class="post">
    <article class="post-card">
      <el-card shadow="hover" v-for="item in pageList">
        <div class="post-head">
          <div class="post-title">
            <router-link :to="item.regularPath">{{ item.frontmatter.title }}</router-link>
          </div>
          <div class="post-meta">
            <span class="post-date">
              <i class="el-icon-date">{{ item.frontmatter.postDate }}</i>
            </span>
            <!-- <time class="post-date" icon="el-icon-date">{{ item.frontmatter.postDate }}</time> -->
          </div>
        </div>

        <div class="featured-media" v-if="item.frontmatter.featured_media">
          <img :src="item.frontmatter.featured_media" class="image">
        </div>

        <div class="post-content">
          <p>{{ item.frontmatter.description }}</p>
        </div>

        <div class="post-permalink">
          <router-link :to="item.regularPath">
            <el-button type="primary" plain>阅读全文</el-button>
          </router-link>
        </div>
      </el-card>
    </article>

    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "PostCard",
  props: {
    pages: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      total: 0,
      currentPage: 1,
      pageSize: 10,
      pageList: [],
      lists: []
    };
  },
  mounted() {
    this.filterPostsList();
  },
  methods: {
    handleSizeChange: function(size) {
      this.pageSize = size;
      this.pageList = this.getPageList();
      console.log(this.pageSize); //每页下拉显示数据
    },
    handleCurrentChange: function(current_page) {
      this.currentPage = current_page;
      this.pageList = this.getPageList();
      console.log(this.currentPage); //点击第几页
    },
    filterPostsList() {
      this.pages.forEach(element => {
        if (element.frontmatter.post == true) {
          element.frontmatter.dateTime = this.formatDate(
            element.frontmatter.date
          );
          element.frontmatter.postDate = this.formatDate(
            element.frontmatter.date
          );
          element.sortDate = element.frontmatter.postDate;
          this.lists.push(element);
          this.pageList = this.getPageList();
        }
      });
      // 通过时间进行排序
      this.pageList.sort(this.compare("sortDate"));
      // 总记录数
      this.total = this.pageList.length;
    },
    /**
     * 获取分页数据
     */
    getPageList() {
      let start = this.currentPage == 1 ? 0 : this.currentPage;
      let offset = this.currentPage + this.pageSize;
      return this.lists.slice(start, offset);
    },
    /**
     * @description: format date
     * @param {type}
     * @return:
     */
    formatDate(time, humanize) {
      let lang = "zh-CN";
      const moment = require("moment");
      moment.locale(lang);
      let postDate = humanize
        ? moment(time).fromNow()
        : moment(time).format("YYYY-MM-DD HH:mm:ss");
      console.log(postDate);
      return postDate;
    },
    /**
     * @description: 对时间进行排序
     * @param {type}
     * @return:
     */
    compare(pro) {
      return function(obj1, obj2) {
        var val1 = obj1[pro];
        var val2 = obj2[pro];
        if (val1 < val2) {
          //正序
          return 1;
        } else if (val1 > val2) {
          return -1;
        } else {
          return 0;
        }
      };
    }
  }
};
</script>

<style lang="stylus" scoped>
.post {
  margin-top: 2rem;
}

.post-card:first {
  margin: 0;
}

.post-card {
  margin: 2rem 0;
}
</style>

