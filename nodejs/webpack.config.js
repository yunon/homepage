module.exports = {
    
    entry : {
        vendor : ['jquery','bootstrap','bootstrap/dist/css/bootstrap.css'],
        app : './resources/js/index.js'
    },
    output : {
        path : `${__dirname}/public`,
        filename : 'main.js'
    },
    mode : 'development', // development or production
    module : {
        rules :[
            {   // cssローダー、スタイルローダー
                test : /\.scss$/,
                use : ['style-loader','css-loader','sass-loader']
            },{// imgローダー
                test : /\.(gif|png|jpg)$/,
                loader : 'url-loader'
            }
        ]
    }
}
