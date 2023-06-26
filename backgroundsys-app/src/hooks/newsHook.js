import { ElMessage } from "element-plus";
import axios from "axios";

export const useSubmitForm = (articleForm, router) => {
  return async (formEl) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        console.log(articleForm);
        const formData = new FormData();
        for (const key in articleForm) {
          formData.append(key, articleForm[key]);
        }

        const { data: res } = await axios.post("/admin/news/add", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        //console.log(res); //{...}

        if (res.code === 200) {
          router.push("/news-manage/newslist");
          ElMessage({
            showClose: true,
            message: res.msg,
            type: "success",
          });
        } else {
          ElMessage({
            showClose: true,
            message: res.msg,
            type: "error",
          });
        }
      } else {
        ElMessage({
          showClose: true,
          message: "更新失败！",
          type: "error",
        });
      }
    });
  };
};

export const useGetArticleList = () => {
  return async (articleList) => {
    const { data: res } = await axios.get("/admin/news/list");
    console.log("文章列表", res);
    articleList.value = res.data;
  };
};

export const useHandleSwitchPublishState = (getArticleList, articleList) => {
  return async (article) => {
    // console.log(article.isPublish);
    await axios.put("/admin/news/publish", {
      _id: article._id,
      isPublish: article.isPublish,
    });

    await getArticleList(articleList);
  };
};

export const useHandleArticlePreview = (previewArticle, dialogVisible) => {
  return async (article) => {
    previewArticle.value = article;
    dialogVisible.value = true;
  };
};

export const useHandlArticleDelete = (getArticleList, articleList) => {
  return async (article) => {
    const { data: res } = await axios.delete(`/admin/news/list/${article._id}`);
    console.log(res);

    if (res.code === 200) {
      ElMessage({
        showClose: true,
        message: res.msg,
        type: "success",
      });
      getArticleList(articleList);
    } else {
      ElMessage({
        showClose: true,
        message: res.msg,
        type: "error",
      });
    }
  };
};

export const useHandleArticleEdit = (editDialogVisible, articleForm) => {
  return async (article) => {
    editDialogVisible.value = true;

    const { data: res } = await axios.get(`/admin/news/list/${article._id}`);

    for (const key in articleForm) {
      articleForm[key] = res.data[key];
    }
    console.log(articleForm);
  };
};

export const useHandleArticleEditConfirm = (getArticleList, articleList, editDialogVisible) => {
  const handleEditConfirm = async (formEl, articleForm) => {
    if (!formEl) return;
    await formEl.validate(async (valid) => {
      if (valid) {
        // console.log(articleForm);
        const {data:res} = await axios.put(
          `/admin/news/list/${articleForm._id}`,
          articleForm
        )
        console.log(res);
        
        if(res.code === 200){
          editDialogVisible.value = false
          ElMessage({
              showClose: true,
              message: res.msg,
              type: 'success',
          })
          getArticleList(articleList)
        }else{
          editDialogVisible.value = false
          ElMessage({
            showClose: true,
            message: res.msg,
            type: 'error',
          })
        }
      }
    });
  };

  return handleEditConfirm;
};
