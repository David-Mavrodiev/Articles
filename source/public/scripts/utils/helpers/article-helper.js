const usersdata = window.usersdata;
const articlesdata = window.articlesdata;
const common = window.common;

((scope) => {
    function addArticleCreate() {
        let articleCreateLink = common.createNavLinkToggle("Create article", "#create-article-modal");

        $accountContainer.append(articleCreateLink);

        templates.get("create-article").then(template => {
            var intlData = {
                "locales": "en-US"
            };

            let html = template(null, {
                data: { intl: intlData }
            });

            $articleCreateContainer.append(html);
            addCreateArticleListener();
        });
    }

    function addReplyListener(){
        let btnReply = $("#btn-reply");

        $(".reply-modal-btn").on("click", (ev) => {
            console.log($(this));
            let articleId = $(ev.target).attr("data-articleid");
            let commentId = $(ev.target).attr("data-commentid");
            
            console.log(articleId);

            btnReply.attr("data-articleid", articleId);
            btnReply.attr("data-commentid", commentId);
        });

        $("#btn-reply").on("click", (ev) => {
            let articleId = $(ev.target).attr("data-articleid");
            let commentId = $(ev.target).attr("data-commentid");
            let content = $("#reply-content").val();

            articlesdata.addReply(articleId, commentId, content)
                .then((resp) => {
                    location.reload();
                });
        });
    }

    function addCreateArticleListener() {
        $("#btn-create-article").on("click", function() {
            let article = {
                title: $("#article-title").val(),
                description: $("#article-description").val(),
                category: $("#article-category").val(),
                image: $("#article-image-link").val()
            };

            articlesdata.addArticle(article)
                .then((resp) => {
                    $("#create-article-modal").modal("hide");
                    Promise.all([articlesData.getArticles(0, 5, ""), templates.get("articles")])
                        .then(([res, template]) => {
                            const articles = res;
                            var intlData = {
                                "locales": "en-US"
                            };

                            let html = template({ articles }, {
                                data: { intl: intlData }
                            });

                            $articlesContainer.html(html);
                        });
                });
        });
    }

    function addCreateCommentListener(articleId) {
        $("#add-comment").on("click", function(){
            let body = {
                articleId: articleId,
                content: $("#comment-content").val()
            };

            articlesdata.addComment(body)
                .then((comment) => {
                    location.reload();
                });
        });
    }

    scope.articleHelper = {
        addArticleCreate: addArticleCreate,
        addCreateCommentListener: addCreateCommentListener,
        addReplyListener: addReplyListener
    }
})(window);