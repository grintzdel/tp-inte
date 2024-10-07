const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production', // Mode production pour minification automatique
    entry: './src/index.js', // Fichier d'entrée
    output: {
        filename: 'bundle.js', // Fichier JS de sortie
        path: path.resolve(__dirname, 'dist'), // Dossier de sortie
    },
    module: {
        rules: [
            {
                test: /\.scss$/, // Cible les fichiers SCSS
                use: [
                    MiniCssExtractPlugin.loader, // Extrait le CSS dans un fichier séparé
                    'css-loader', // Interprète les @import et url() dans CSS
                    'sass-loader', // Compile le SCSS en CSS
                ],
            },
            {
                test: /\.(png|jpe?g)$/i,
                type: 'asset', // Utilise Webpack pour gérer les fichiers images
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css', // Nom du fichier CSS extrait
        }),
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, "src", "images"),
                to: path.resolve(__dirname, 'dist', 'images') // Copie les images dans dist
            }]
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({}), // Minification JS
            new ImageMinimizerPlugin({
                minimizer: {
                    // Configuration pour convertir en WebP
                    implementation: ImageMinimizerPlugin.imageminGenerate,
                    options: {
                        plugins: [
                            ['imagemin-webp', { quality: 75 }] // Convertir en WebP avec qualité 75
                        ],
                    },
                },
            }),
        ],
    },
};
