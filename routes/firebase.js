var express = require('express');
var router = express.Router();

var firebase = require('firebase');
firebase.initializeApp({
    serviceAccount: {
        projectId: "web-site-daf19",
        clientEmail: "get-access-to-database@web-site-daf19.iam.gserviceaccount.com",
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCOxU5t1zO+j1cN\nSvme8MsOaUSaJWyy+4nLwusz1rNpG3XsyU2AnSQrXJYf3pzC/prKZKi5rYF+oO6J\nk08LYAl73mz+eOI8cxqyExR/8/rv+soWKejFp2xYhNRw7zqjv/f120WgnqoLFR4G\nPGdFiUjrq7bmRyzntaVpfC36yvsiISpHY1OhPIAnwVU7NZRlDnx6SN9JV57Sj4+F\nGZyd6FoeYPh1iqRvgmMAUotjHp+E1XxNTNcWdR9Tdn6ZTjlAgg+8Mxu3cZyVO2Ig\ne4+jIzxErY7rtUFaEcB7y6RHp14Cjk9Jh+I5ue9vY/lRIgHf4FHYOli8PZkivDqu\n7ZhUn/fnAgMBAAECggEAIJBYRy1inABNtrZ3IQ2DAxJ3l0EZ/ejpkRQwWW6LFVoy\nF4QCrWcqLMm9ZB9+WeuAmtFCurccZimGvtJeoRWSlDIzYgdocqk+WYeIkXawsbPe\nDBgbA5ogWEBTxD6MfXT3tZgB1ZTa7BQw+PMmCvI5M6fC29s4HtGLnPe59Q3/IdVf\nagJtssAQGdXhRMCKUq4Of7hyJjiTjuaL0UuJq0QBAcZ+O3gCgats6EuZJJPB/kee\nb1gMIGFff7pRzc71lI542mgG36OisAdJdmeWuf2FhqGP26bvm9InoSImQopFeI36\ntM8Nq0jlALacqWbVWZeBrSWzhS0vnM7u/CWQz2pyYQKBgQDHRuNHBZvY82wCK9O5\nQmNUa05xdEQtGRIbl+KnedrvgHDMIpBzUjqgERnGxS9km6vJsOb3FBPOXM6DRwYv\nEOW3HqhAVoMS3WEoXXOBdpKLFyQ7rM20Ub8Y7DxYxo6s9h5TblOjHLa+9Hs5N4EZ\n6U9KVoLpxzoSrPfPrqKvr6W+IwKBgQC3aN5z9eLHgYDojz+eqNyYph3QS62vYyOH\nYm+yXqnOiLXgQDy+emmyBMq5yk9MI5G+Rj7nvjFdjKYspGehc5DhvuOMQxbqYh60\nSWspV9sHAs4ynfC+PWIlWLnYrfUjQ93gizrHzrygC7vJwktdpV/bGtV+zP7I8YK5\n3Xuq1j6hbQKBgQCa/UtvxbD8//aVibjWcggHdJ5CJ4eO+9zVkUA7uc7KUD9qxcdL\nqjzmmeZObrb5rQnjiK9apEbzTcNg3zC0EpRX5IQ/5glz9rLGTkiz/KDlhU4tC63B\n/YJ/w9z7vxLg+1uC0GBEkOShiEz+p2jF2mxNCRQw9z73n4fuA4mM0zQ5uQKBgEOS\n/bLXuzAqRKZqcNQx/uS2/3EJEPr3mdV9rQ2Y1xNjRy9SO48qZtrR7Sc6pLC2wjHK\ni86yQlnnQipcgFn5zD2AKTI6Xa0JbaqbCkJ3Phl9LR91FYfh8dE0uXRd012k2ZCr\ne4K2ZsTIze1uCnp8Pa7qWhKX0J+Ua8ezFKdCvFyZAoGAabWv7S7SLXWlijZLE1LV\newNLOyapz7tHeJpDp7UbnE4thLxFK9m4/XA8hN6Anj/ZovPVDFnRZ0ROm7m70XWn\nZgvodNmYrxLYFts5gL9xZw8PQZGzkBkFA3/HHA/gYrecc3Mt5ZQt9qt5TLIr/AGK\nrTB5NeSTSx+xu9DVWZ0vfug=\n-----END PRIVATE KEY-----\n"
    },
    databaseURL: "https://web-site-daf19.firebaseio.com"
});






router.get('/:id' ,function (req, res, next) {
    var ref = firebase.database().ref('content');
    var page = req.params.id;
    console.log(req.params.id);
    ref.once("value", function (snapshot) {
        if(snapshot.val() != null) {
            var helperMassive = [];
            var numberArticles = snapshot.val().length;
            var content  =  numberArticles - 11 - page;
            var allContent = numberArticles - 1 - page;
            if(allContent < 1){
                allContent = 1
            }
            if(content <= 0){
                content = 0;
            }
            for (i = allContent; i >= content; i--) {
                helperMassive.push(snapshot.val()[i]);
            }

            return res.status(200).json({
                message: 'success',
                obj: helperMassive
            });
        }else{
            return res.status(200).json({
                message:'Does not have data'
            })
        }
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        return res.status(500).json({
            message: 'Error',
            err: errorObject
        });

    });

});


router.post('/:id' , function(req , res , next){
    var ref = firebase.database().ref('content');
    var article = req.body;
    var oldMassive = [];
    var param = req.params.id;
    console.log(req.params.id);
    ref.once("value", function (snapshot) {
            if(snapshot.val() != null) {
                oldMassive = snapshot.val();
            }else {
                oldMassive = [];
                article.id = -1;
            }
            if(param == 'save'){

                article.id =  oldMassive.length ;
                console.log(article);
                oldMassive.push(article);
                ref.set(oldMassive ,function(error) {
                    if (error) {
                        return res.status(417).json({
                            message: 'Did not save'
                        });
                    } else {
                        return res.status(200).json({
                            message: 'Done'
                        });
                    }
                });
            }else if(param == 'edit'){
                for(i= 0 ; i < oldMassive.length ; i++){
                    if(oldMassive[i].id == article.id){
                        console.log(oldMassive[0].id);
                        console.log(article.id);
                        oldMassive[i] = article;
                        ref.set(oldMassive ,function(error) {
                            if (error) {
                                return res.status(417).json({
                                    message: 'Did not save'
                                });
                            } else {
                                return res.status(200).json({
                                    message: 'Done'
                                });
                            }
                        });
                    }
                }

            }else{
                for(i = 0 ; i < oldMassive.length ; i++){
                    if(oldMassive[i].id == article.id){
                        oldMassive.splice(i, 1);

                        for(j = 0 ; j < oldMassive.length; j++){
                            if(oldMassive.length > 0) {
                                oldMassive[j].id = j;
                            }

                            if(j == oldMassive.length - 1){
                                ref.set(oldMassive ,function(error) {
                                    if (error) {
                                        return res.status(417).json({
                                            message: 'Did not deleted'
                                        });
                                    } else {
                                        return res.status(200).json({
                                            message: 'Done'
                                        });
                                    }
                                });

                            }
                        }
                        if(oldMassive ==  0){
                            if(oldMassive.length == 0){
                                ref.set(oldMassive ,function(error) {
                                    if (error) {
                                        return res.status(417).json({
                                            message: 'Did not deleted'
                                        });
                                    } else {
                                        return res.status(200).json({
                                            message: 'Done'
                                        });
                                    }
                                });
                            }
                        }

                    }
                }

            }
    });
});



module.exports = router;
