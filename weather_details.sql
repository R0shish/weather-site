-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 11, 2022 at 01:43 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `weather_details`
--

-- --------------------------------------------------------

--
-- Table structure for table `weather_data`
--

CREATE TABLE `weather_data` (
  `weather_id` int(4) NOT NULL,
  `weather_main` varchar(100) NOT NULL,
  `weather_desc` varchar(100) NOT NULL,
  `weather_temp` float NOT NULL,
  `weather_wind` float NOT NULL,
  `weather_time` datetime NOT NULL,
  `city` varchar(100) NOT NULL,
  `country` varchar(50) NOT NULL,
  `humidity` float NOT NULL,
  `pressure` float NOT NULL,
  `cloudiness` float NOT NULL,
  `weather_wind_direction` float NOT NULL,
  `dt` int(11) NOT NULL,
  `search_query` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `weather_data`
--

INSERT INTO `weather_data` (`weather_id`, `weather_main`, `weather_desc`, `weather_temp`, `weather_wind`, `weather_time`, `city`, `country`, `humidity`, `pressure`, `cloudiness`, `weather_wind_direction`, `dt`, `search_query`) VALUES
(800, 'Clear', 'clear sky', 28.34, 1.03, '2022-08-11 17:27:08', 'Trafford', 'GB', 46, 1023, 1, 0, 1660218127, 'trafford,gb'),
(803, 'Clouds', 'broken clouds', 28.12, 4.12, '2022-08-11 17:27:24', 'Kathmandu', 'NP', 65, 1008, 75, 220, 1660217624, 'Kathmandu'),
(802, 'Clouds', 'scattered clouds', 30.4, 1.03, '2022-08-11 17:27:39', 'Rome', 'IT', 51, 1014, 40, 0, 1660217925, 'Rome,It'),
(800, 'Clear', 'clear sky', 31, 4.89, '2022-08-11 17:27:47', 'Paris', 'FR', 29, 1017, 2, 73, 1660217957, 'Paris'),
(803, 'Clouds', 'broken clouds', 25.74, 0.68, '2022-08-11 17:28:00', 'Pokhara', 'NP', 85, 1003, 72, 58, 1660217950, 'Pokhara');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
