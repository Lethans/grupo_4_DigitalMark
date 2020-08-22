-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 22-08-2020 a las 21:33:50
-- Versión del servidor: 10.4.13-MariaDB
-- Versión de PHP: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `digitalmarksdb`
--
CREATE DATABASE IF NOT EXISTS `digitalmarksdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `digitalmarksdb`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `atributecomponents`
--

DROP TABLE IF EXISTS `atributecomponents`;
CREATE TABLE `atributecomponents` (
  `id` int(11) NOT NULL,
  `componentId` int(11) NOT NULL,
  `atributeId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `atributes`
--

DROP TABLE IF EXISTS `atributes`;
CREATE TABLE `atributes` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `brands`
--

DROP TABLE IF EXISTS `brands`;
CREATE TABLE `brands` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `logo` varchar(50) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `brands`
--

INSERT INTO `brands` (`id`, `name`, `logo`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Acer', 'acer.svg', '2020-08-16 14:52:12', '2020-08-16 14:52:12', '2020-08-16 14:52:12'),
(2, 'Apple', 'apple.svg', '2020-08-19 00:26:03', '2020-08-19 00:26:03', '2020-08-19 00:26:03'),
(3, 'Asus', 'asus.svg', '2020-08-19 00:26:07', '2020-08-19 00:26:07', '2020-08-19 00:26:07'),
(4, 'Compaq', 'compaq.svg', '2020-08-19 23:13:37', '2020-08-19 23:13:37', '2020-08-19 23:13:37'),
(5, 'Dell', 'dell.svg', '2020-08-19 23:13:37', '2020-08-19 23:13:37', '2020-08-19 23:13:37'),
(6, 'HP', 'hp.svg', '2020-08-19 23:13:37', '2020-08-19 23:13:37', '2020-08-19 23:13:37'),
(7, 'Lenovo', 'lenovo.svg', '2020-08-19 23:13:37', '2020-08-19 23:13:37', '2020-08-19 23:13:37'),
(8, 'Microsoft', 'microsoft.svg', '2020-08-19 23:23:16', '2020-08-19 23:23:16', '2020-08-19 23:23:16'),
(9, 'Samsung', 'samsung.svg', '2020-08-19 23:23:16', '2020-08-19 23:23:16', '2020-08-19 23:23:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cartproducts`
--

DROP TABLE IF EXISTS `cartproducts`;
CREATE TABLE `cartproducts` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `salePrice` int(11) NOT NULL,
  `subTotal` int(11) NOT NULL,
  `state` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `sellerId` int(11) NOT NULL,
  `cartId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carts`
--

DROP TABLE IF EXISTS `carts`;
CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `orderNumber` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `componentproducts`
--

DROP TABLE IF EXISTS `componentproducts`;
CREATE TABLE `componentproducts` (
  `id` int(11) NOT NULL,
  `componentId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `value` varchar(150) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `components`
--

DROP TABLE IF EXISTS `components`;
CREATE TABLE `components` (
  `id` int(11) NOT NULL,
  `value` varchar(150) NOT NULL,
  `brandId` int(11) NOT NULL,
  `typeId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imageproduct`
--

DROP TABLE IF EXISTS `imageproduct`;
CREATE TABLE `imageproduct` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `imageId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `images`
--

DROP TABLE IF EXISTS `images`;
CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `filename` varchar(150) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `models`
--

DROP TABLE IF EXISTS `models`;
CREATE TABLE `models` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `models`
--

INSERT INTO `models` (`id`, `name`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'modl', '2020-08-18 21:49:10', '2020-08-18 21:49:10', '2020-08-18 21:49:10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `cartId` int(11) NOT NULL,
  `paymentId` int(11) NOT NULL,
  `shipmentId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paymentmethods`
--

DROP TABLE IF EXISTS `paymentmethods`;
CREATE TABLE `paymentmethods` (
  `id` int(11) NOT NULL,
  `method` varchar(50) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `brandId` int(11) NOT NULL,
  `modelId` int(11) NOT NULL,
  `description` varchar(150) NOT NULL,
  `price` int(11) NOT NULL,
  `oldPrice` int(11) NOT NULL,
  `discount` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `outstanding` tinyint(4) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `brandId`, `modelId`, `description`, `price`, `oldPrice`, `discount`, `stock`, `outstanding`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'prueba', 2, 1, 'descripcion', 12000, 15000, 15, 3, 1, '2020-08-18 21:48:46', '2020-08-22 19:27:15', '2020-08-18 21:48:46');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rols`
--

DROP TABLE IF EXISTS `rols`;
CREATE TABLE `rols` (
  `id` int(11) NOT NULL,
  `label` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `shipments`
--

DROP TABLE IF EXISTS `shipments`;
CREATE TABLE `shipments` (
  `id` int(11) NOT NULL,
  `address` varchar(50) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `types`
--

DROP TABLE IF EXISTS `types`;
CREATE TABLE `types` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(150) NOT NULL,
  `lastName` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `avatar` varchar(150) NOT NULL,
  `rolId` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `avatar`, `rolId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'ASD', 'ASD', 'asd@asd.com', '$2a$10$D8jdubc.d.UVOpOFo70T4uqG8uUAkqUEa.3j1l789WGU3yn4A4tNe', 'foto-1597871160377.png', 1, '2020-08-19 21:06:00', '2020-08-19 21:06:00', '2020-08-19 21:06:00'),
(2, 'BASE', 'BASE', 'pasta@base.com', '$2a$10$fiH.xJ3WEo.hY1Ig1KnMJ.49.ShG4IazH7mN5O3LkRXib.m6jVB3e', 'foto-1597871657419.png', 1, '2020-08-19 21:14:17', '2020-08-19 21:14:17', '2020-08-19 21:14:17'),
(3, 'asddsa', 'sdaasd', 'asdsa@asdasd.com', '$2a$10$28URSFjObrcAc28f8ozkwOh2BzdXWSpYUFja3Rwe/Eg5BkgBq6g02', 'foto-1597876794700.png', 1, '2020-08-19 22:39:54', '2020-08-19 22:39:54', '2020-08-19 22:39:54'),
(4, 'admin', 'admin', 'admin@admin.com', '$2a$10$gGza3kCf7S3aXVaxUiB97eIqVdVYqujKyqk/FIck5w9XkCmBKsXyO', 'admin.png', 1, '2020-08-19 22:47:23', '2020-08-19 22:47:23', '2020-08-19 22:47:23'),
(5, 'dsaasd', 'dassad', 'adssda@asdsad.com', '$2a$10$59QFI/5Mw7vDuTILIDxCU.uyUZ9tKTpdhAyDrp3N2Jn7S1o6SlmWy', 'foto-1597886944859.png', 1, '2020-08-20 01:29:04', '2020-08-20 01:29:04', '2020-08-20 01:29:05'),
(6, 'dsad', 'ddasd', 'asd@dasda.com', '$2a$10$HmCF59rZOpQGU4MQCbP0Ye1qzd8/r.J1PZkcJDlTBqRVWtDtMAnSC', 'foto-1597887636449.png', 1, '2020-08-20 01:40:36', '2020-08-20 01:40:36', '2020-08-20 01:40:36'),
(7, 'adsdsa', 'dasads', 'adsdasdas@asd.com', '$2a$10$0mvD2kI9E8HZSGHahzWhne8zTMx2NjjCVuvXRnJfUnM.nFU52oQpi', 'foto-1597887739287.png', 1, '2020-08-20 01:42:19', '2020-08-20 01:42:19', '2020-08-20 01:42:19'),
(8, 'dsad', 'dassad', 'sad@dd.com', '$2a$10$mhj5t4z5yp9FVTd2gi1F6ewxd7bqM0KT9YrdAH2E2GNsCZ06wYOmC', 'foto-1597887759235.png', 1, '2020-08-20 01:42:39', '2020-08-20 01:42:39', '2020-08-20 01:42:39'),
(9, 'dsads', 'das', 'dss@ddd.com', '$2a$10$M/c5GDfHYbkHmbucmUo4lu76u6zy13E3SYRKO83xG9VtIFNKuinO6', 'foto-1597887801093.png', 1, '2020-08-20 01:43:21', '2020-08-20 01:43:21', '2020-08-20 01:43:21'),
(10, 'dds', 'dsa', 'asd@a.com', '$2a$10$aCVTtKYtp0tD3xlparXFpObQHn2MVFJc7uIjQpIpXKKgThqb/LUUa', 'foto-1597887901270.png', 1, '2020-08-20 01:45:01', '2020-08-20 01:45:01', '2020-08-20 01:45:01'),
(11, 'dd', 'asd', 'asd@dasdd.com', '$2a$10$912dpR1iGI/hGSJt.OalwOdCJVvhdapaJO4s4yU0We7lQUISoNiJi', 'foto-1597889921923.png', 1, '2020-08-20 02:18:42', '2020-08-20 02:18:42', '2020-08-20 02:18:42'),
(12, 'dsdasdas', 'dasdasdas', 'dasdsadas@adsdasd.com', '$2a$10$FffJ6YXUrTFeypW5MIBySOEV42MaxfHLgnPpYulxK0iSW.3byKZQ6', 'foto-1597890245841.png', 1, '2020-08-20 02:24:06', '2020-08-20 02:24:06', '2020-08-20 02:24:06');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `atributecomponents`
--
ALTER TABLE `atributecomponents`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `atributes`
--
ALTER TABLE `atributes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cartproducts`
--
ALTER TABLE `cartproducts`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `componentproducts`
--
ALTER TABLE `componentproducts`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `components`
--
ALTER TABLE `components`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `imageproduct`
--
ALTER TABLE `imageproduct`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `models`
--
ALTER TABLE `models`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `paymentmethods`
--
ALTER TABLE `paymentmethods`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `rols`
--
ALTER TABLE `rols`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `shipments`
--
ALTER TABLE `shipments`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `atributecomponents`
--
ALTER TABLE `atributecomponents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `atributes`
--
ALTER TABLE `atributes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `cartproducts`
--
ALTER TABLE `cartproducts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `componentproducts`
--
ALTER TABLE `componentproducts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `components`
--
ALTER TABLE `components`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `imageproduct`
--
ALTER TABLE `imageproduct`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `models`
--
ALTER TABLE `models`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `paymentmethods`
--
ALTER TABLE `paymentmethods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `rols`
--
ALTER TABLE `rols`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `shipments`
--
ALTER TABLE `shipments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `types`
--
ALTER TABLE `types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
