module.exports = {
    
    entry : './public/resource/index.js',
    output : {
        path : `${__dirname}/public`,
        filename : 'main.js'
    },
    mode : 'development', // development or production
    module : {
        rules :[
            {   // cssローダー、スタイルローダー
                test : /\.css$/,
                use : [
                    'style-loader',
                    'css-loader'
            ]
            },{// imgローダー
                test : /\.(gif|png|jpg)$/,
                loader : 'url-loader'
            }
        ]
    }
}
