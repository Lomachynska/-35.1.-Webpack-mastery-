const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Точка входу для вашого додатку
  output: {
    path: path.resolve(__dirname, 'dist'), // Директорія для зібраних файлів
    filename: 'bundle.js', // Ім'я вихідного файлу для JavaScript
  },
  mode: 'development', // Встановлюємо режим Webpack на розробку для кращої налагодження
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Сервер статичних файлів з папки 'dist'
    },
    hot: true, // Увімкнути гаряче оновлення модулів для швидкої розробки
    port: 8080, // (необов'язково): змінити порт за замовчуванням для webpack-dev-server
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Транспілюємо JavaScript файли
        exclude: /node_modules/,
        use: 'babel-loader', // Використовуємо Babel для транспіляції JavaScript
      },
      {
        test: /\.(scss|css)$/, // Обробка SCSS та CSS файлів
        use: [
          MiniCssExtractPlugin.loader, // Витягування CSS у окремі файли
          'css-loader', // Завантажуємо CSS у JavaScript
          'sass-loader', // Компілюємо SCSS в CSS
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/, // Обробка зображень
        type: 'asset/resource', // Зберігаємо зображення як окремі файли
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // Очищаємо папку 'dist' перед кожним новим збиранням
    new HtmlWebpackPlugin({
      template: './src/index.html', // Використовуємо 'index.html' як шаблон
      favicon: './src/favicon.ico', // (необов'язково): вказуємо шлях до favicon
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css', // Виводимо CSS файли з іменем, яке відповідає точці входу
    }),
    new ESLintPlugin({ fix: true }), // Лінтуємо JavaScript файли та автоматично виправляємо помилки
  ],
  resolve: {
    extensions: ['.js', '.jsx'], // Розпізнаємо файли з розширеннями .js та .jsx
  },
};
