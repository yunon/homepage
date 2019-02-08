const webpack = require('webpack');
//       vendor : ['jquery','popper.js','bootstrap','bootstrap/dist/css/bootstrap.css'],
module.exports = {
    
    entry : {
        app : './resources/js/index.js',
        article : './resources/sass/article.scss'
    },
    output : {
        path : `${__dirname}/public`,
        filename : '[name].js'
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
            },{
                test : /\.css$/,
                use : ['style-loader','css-loader']
            }
        ]
    },
    plugins : [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: 'popper.js'
        }),
    ]
}
