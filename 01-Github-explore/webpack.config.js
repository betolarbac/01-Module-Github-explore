//importação de pacote no node para melhor funcionamento em sistemas operacionais 
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

// verificar se é dependencia de desenvolvimento ou de produção 
const isDevelopment = process.env.NODE_ENV !== 'production';

//configuração de webpack para leitura de arquivos js e jsx 
module.exports = {
    //mode de desenvolvimento 
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    //ler esse arquivos
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    //e reproduzir nessa pasta e nesse arquivo
    output: { 
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js' 
    },
    resolve: {
        extensions: ['.js', '.jsx', 'ts', 'tsx'],
    },

    //configuração de server de atualização automatica 
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
          },
          hot:true,
    },

    plugins: [
        isDevelopment && new ReactRefreshWebpackPlugin(),
       new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html')
        })
    ].filter(Boolean),
    //configuração de comportamento de importação 
    module: {
        rules: [
            {
                test: /\.(j|t)sx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            isDevelopment && require.resolve('react-refresh/babel')
                        ].filter(Boolean)
                    }
                },
            },

            { //configuração de scss 
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ],
    }
};