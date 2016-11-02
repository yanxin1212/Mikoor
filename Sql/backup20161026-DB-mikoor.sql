-- MySQL dump 10.13  Distrib 5.6.32, for Win64 (x86_64)
--
-- Host: localhost    Database: lungu
-- ------------------------------------------------------
-- Server version	5.6.32-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accountfund`
--

DROP TABLE IF EXISTS `accountfund`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accountfund` (
  `AccountFund_Id` int(11) NOT NULL,
  `FundAccount_Id` int(11) DEFAULT NULL,
  `SysCurrency_Id` int(11) DEFAULT NULL,
  `Fund` decimal(18,2) DEFAULT NULL,
  PRIMARY KEY (`AccountFund_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accountfund`
--

LOCK TABLES `accountfund` WRITE;
/*!40000 ALTER TABLE `accountfund` DISABLE KEYS */;
/*!40000 ALTER TABLE `accountfund` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accountinrecord`
--

DROP TABLE IF EXISTS `accountinrecord`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accountinrecord` (
  `AccountInRecord_Id` int(11) NOT NULL,
  `AIRCode` varchar(10) DEFAULT NULL,
  `AIRType` int(11) DEFAULT NULL,
  `SalePlatform_Id` int(11) DEFAULT NULL,
  `SaleSite_Id` int(11) DEFAULT NULL,
  `SysCurrency_Id` int(11) DEFAULT NULL,
  `Receive` decimal(18,2) DEFAULT NULL,
  `ReceivedIn` decimal(18,2) DEFAULT NULL,
  `State` int(11) DEFAULT NULL,
  `Remark` text,
  `OperateTime` datetime DEFAULT NULL,
  `OperateBy` int(11) DEFAULT NULL,
  `AccountYear` int(11) DEFAULT NULL,
  `AccountMonth` int(11) DEFAULT NULL,
  `LastUpdatedTime` datetime DEFAULT NULL,
  `LastUpdatedBy` int(11) DEFAULT NULL,
  `RvObject` varchar(255) DEFAULT NULL,
  `BizContent` text,
  `SaleOrder_Id` int(11) DEFAULT NULL,
  `SaleOrderCode` varchar(50) DEFAULT NULL,
  `FromSource` varchar(50) DEFAULT NULL,
  `SIKey` varchar(50) DEFAULT NULL,
  `Customer_Id` int(11) DEFAULT NULL,
  `Supplier_Id` int(11) DEFAULT NULL,
  `PurchaseOrder_Id` int(11) DEFAULT NULL,
  `AS_Problem_Id` int(11) DEFAULT NULL,
  `SOCode` varchar(50) DEFAULT NULL,
  `ASPCode` varchar(50) DEFAULT NULL,
  `CustName` varchar(255) DEFAULT NULL,
  `POCode` varchar(50) DEFAULT NULL,
  `SuppName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`AccountInRecord_Id`),
  KEY `SaleOrder_Id` (`SaleOrder_Id`),
  KEY `PurchaseOrder_Id` (`PurchaseOrder_Id`),
  KEY `SysCurrency_Id` (`SysCurrency_Id`),
  KEY `State` (`State`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accountinrecord`
--

LOCK TABLES `accountinrecord` WRITE;
/*!40000 ALTER TABLE `accountinrecord` DISABLE KEYS */;
INSERT INTO `accountinrecord` VALUES (1,'FR1000001',1,8,4,2,100.00,0.00,1,'','2016-10-23 00:00:00',0,2016,10,'2016-10-23 21:33:01',0,'','',1,NULL,'',NULL,4,0,0,0,'S075084788',NULL,'xxxxx',NULL,NULL);
/*!40000 ALTER TABLE `accountinrecord` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `accountinrecord_report_v`
--

DROP TABLE IF EXISTS `accountinrecord_report_v`;
/*!50001 DROP VIEW IF EXISTS `accountinrecord_report_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `accountinrecord_report_v` AS SELECT 
 1 AS `AccountInRecord_Id`,
 1 AS `AIRCode`,
 1 AS `AIRType`,
 1 AS `SalePlatform_Id`,
 1 AS `SaleSite_Id`,
 1 AS `SysCurrency_Id`,
 1 AS `Receive`,
 1 AS `ReceivedIn`,
 1 AS `State`,
 1 AS `Remark`,
 1 AS `OperateTime`,
 1 AS `OperateBy`,
 1 AS `AccountYear`,
 1 AS `AccountMonth`,
 1 AS `LastUpdatedTime`,
 1 AS `LastUpdatedBy`,
 1 AS `RvObject`,
 1 AS `BizContent`,
 1 AS `SaleOrder_Id`,
 1 AS `SaleOrderCode`,
 1 AS `FromSource`,
 1 AS `SIKey`,
 1 AS `Customer_Id`,
 1 AS `Supplier_Id`,
 1 AS `PurchaseOrder_Id`,
 1 AS `AS_Problem_Id`,
 1 AS `SOCode`,
 1 AS `ASPCode`,
 1 AS `CustName`,
 1 AS `POCode`,
 1 AS `SuppName`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `accountinrecord_v`
--

DROP TABLE IF EXISTS `accountinrecord_v`;
/*!50001 DROP VIEW IF EXISTS `accountinrecord_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `accountinrecord_v` AS SELECT 
 1 AS `AccountInRecord_Id`,
 1 AS `AIRCode`,
 1 AS `AIRType`,
 1 AS `SalePlatform_Id`,
 1 AS `SaleSite_Id`,
 1 AS `SysCurrency_Id`,
 1 AS `Receive`,
 1 AS `ReceivedIn`,
 1 AS `State`,
 1 AS `Remark`,
 1 AS `OperateTime`,
 1 AS `OperateBy`,
 1 AS `AccountYear`,
 1 AS `AccountMonth`,
 1 AS `LastUpdatedTime`,
 1 AS `LastUpdatedBy`,
 1 AS `RvObject`,
 1 AS `BizContent`,
 1 AS `SaleOrder_Id`,
 1 AS `SaleOrderCode`,
 1 AS `FromSource`,
 1 AS `SIKey`,
 1 AS `Customer_Id`,
 1 AS `Supplier_Id`,
 1 AS `PurchaseOrder_Id`,
 1 AS `AS_Problem_Id`,
 1 AS `SOCode`,
 1 AS `ASPCode`,
 1 AS `CustName`,
 1 AS `POCode`,
 1 AS `SuppName`,
 1 AS `FreezePRFund`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `accountoutrecord`
--

DROP TABLE IF EXISTS `accountoutrecord`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accountoutrecord` (
  `AccountOutRecord_Id` int(11) NOT NULL,
  `AORCode` varchar(10) DEFAULT NULL,
  `SalePlatform_Id` int(11) DEFAULT NULL,
  `SaleSite_Id` int(11) DEFAULT NULL,
  `CostSubject_Id` int(11) DEFAULT NULL,
  `SysCurrency_Id` int(11) DEFAULT NULL,
  `Payout` decimal(18,2) DEFAULT NULL,
  `Paidout` decimal(18,2) DEFAULT NULL,
  `State` int(11) DEFAULT NULL,
  `Remark` text,
  `OperateTime` datetime DEFAULT NULL,
  `OperateBy` int(11) DEFAULT NULL,
  `AccountYear` int(11) DEFAULT NULL,
  `AccountMonth` int(11) DEFAULT NULL,
  `LastUpdatedTime` datetime DEFAULT NULL,
  `LastUpdatedBy` int(11) DEFAULT NULL,
  `PayObject` varchar(255) DEFAULT NULL,
  `BizContent` varchar(255) DEFAULT NULL,
  `SaleOrder_Id` int(11) DEFAULT NULL,
  `AS_Problem_Id` int(11) DEFAULT NULL,
  `Customer_Id` int(11) DEFAULT NULL,
  `Supplier_Id` int(11) DEFAULT NULL,
  `PurchaseOrder_Id` int(11) DEFAULT NULL,
  `ExpressOrder_Id` int(11) DEFAULT NULL,
  `FromSource` varchar(50) DEFAULT NULL,
  `SIKey` varchar(50) DEFAULT NULL,
  `SOCode` varchar(50) DEFAULT NULL,
  `CustName` varchar(255) DEFAULT NULL,
  `EOCode` varchar(50) DEFAULT NULL,
  `LstSolutionName` varchar(50) DEFAULT NULL,
  `TrackingNumber` varchar(50) DEFAULT NULL,
  `OutEOCode` varchar(50) DEFAULT NULL,
  `ASPCode` varchar(50) DEFAULT NULL,
  `POCode` varchar(50) DEFAULT NULL,
  `SuppName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`AccountOutRecord_Id`),
  KEY `SaleOrder_Id` (`SaleOrder_Id`),
  KEY `AS_Problem_Id` (`AS_Problem_Id`),
  KEY `PurchaseOrder_Id` (`PurchaseOrder_Id`),
  KEY `ExpressOrder_Id` (`ExpressOrder_Id`),
  KEY `SysCurrency_Id` (`SysCurrency_Id`),
  KEY `State` (`State`),
  KEY `CostSubject_Id` (`CostSubject_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accountoutrecord`
--

LOCK TABLES `accountoutrecord` WRITE;
/*!40000 ALTER TABLE `accountoutrecord` DISABLE KEYS */;
/*!40000 ALTER TABLE `accountoutrecord` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `accountoutrecord_report_v`
--

DROP TABLE IF EXISTS `accountoutrecord_report_v`;
/*!50001 DROP VIEW IF EXISTS `accountoutrecord_report_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `accountoutrecord_report_v` AS SELECT 
 1 AS `AccountOutRecord_Id`,
 1 AS `AORCode`,
 1 AS `SalePlatform_Id`,
 1 AS `SaleSite_Id`,
 1 AS `CostSubject_Id`,
 1 AS `SysCurrency_Id`,
 1 AS `Payout`,
 1 AS `Paidout`,
 1 AS `State`,
 1 AS `Remark`,
 1 AS `OperateTime`,
 1 AS `OperateBy`,
 1 AS `AccountYear`,
 1 AS `AccountMonth`,
 1 AS `LastUpdatedTime`,
 1 AS `LastUpdatedBy`,
 1 AS `PayObject`,
 1 AS `BizContent`,
 1 AS `SaleOrder_Id`,
 1 AS `AS_Problem_Id`,
 1 AS `Customer_Id`,
 1 AS `Supplier_Id`,
 1 AS `PurchaseOrder_Id`,
 1 AS `ExpressOrder_Id`,
 1 AS `FromSource`,
 1 AS `SIKey`,
 1 AS `SOCode`,
 1 AS `CustName`,
 1 AS `EOCode`,
 1 AS `LstSolutionName`,
 1 AS `TrackingNumber`,
 1 AS `OutEOCode`,
 1 AS `ASPCode`,
 1 AS `POCode`,
 1 AS `SuppName`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `accountoutrecord_v`
--

DROP TABLE IF EXISTS `accountoutrecord_v`;
/*!50001 DROP VIEW IF EXISTS `accountoutrecord_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `accountoutrecord_v` AS SELECT 
 1 AS `AccountOutRecord_Id`,
 1 AS `AORCode`,
 1 AS `SalePlatform_Id`,
 1 AS `SaleSite_Id`,
 1 AS `CostSubject_Id`,
 1 AS `SysCurrency_Id`,
 1 AS `Payout`,
 1 AS `Paidout`,
 1 AS `State`,
 1 AS `Remark`,
 1 AS `OperateTime`,
 1 AS `OperateBy`,
 1 AS `AccountYear`,
 1 AS `AccountMonth`,
 1 AS `LastUpdatedTime`,
 1 AS `LastUpdatedBy`,
 1 AS `PayObject`,
 1 AS `BizContent`,
 1 AS `SaleOrder_Id`,
 1 AS `AS_Problem_Id`,
 1 AS `Customer_Id`,
 1 AS `Supplier_Id`,
 1 AS `PurchaseOrder_Id`,
 1 AS `ExpressOrder_Id`,
 1 AS `FromSource`,
 1 AS `SIKey`,
 1 AS `SOCode`,
 1 AS `CustName`,
 1 AS `EOCode`,
 1 AS `LstSolutionName`,
 1 AS `TrackingNumber`,
 1 AS `OutEOCode`,
 1 AS `ASPCode`,
 1 AS `POCode`,
 1 AS `SuppName`,
 1 AS `SPfName`,
 1 AS `SaleSiteName`,
 1 AS `CostSubjectName`,
 1 AS `CurrSymbol`,
 1 AS `CurrName`,
 1 AS `LRCode`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `as_problem`
--

DROP TABLE IF EXISTS `as_problem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `as_problem` (
  `AS_Problem_Id` int(11) NOT NULL,
  `Customer_Id` int(11) DEFAULT NULL,
  `SalePlatform_Id` int(11) DEFAULT NULL,
  `SaleSite_Id` int(11) DEFAULT NULL,
  `ASPCode` varchar(50) DEFAULT NULL,
  `SaleOrder_Id` int(11) DEFAULT NULL,
  `SOCode` varchar(50) DEFAULT NULL,
  `ProblemType` int(11) DEFAULT NULL,
  `CustReturn` int(11) DEFAULT NULL,
  `ProblemRemark` varchar(255) DEFAULT NULL,
  `HandleType` int(11) DEFAULT NULL,
  `HandleRemark` varchar(255) DEFAULT NULL,
  `Refund` decimal(18,2) DEFAULT NULL,
  `SysCurrency_Id` int(11) DEFAULT NULL,
  `State` int(11) DEFAULT NULL,
  `IsResend` int(11) DEFAULT NULL,
  `CreateTime` datetime DEFAULT NULL,
  `Creator` int(11) DEFAULT NULL,
  `LastUpdatedTime` datetime DEFAULT NULL,
  `LastUpdatedBy` int(11) DEFAULT NULL,
  `SubmitHandleTime` datetime DEFAULT NULL,
  `SubmitHandler` int(11) DEFAULT NULL,
  `ExpressOrder_Id` int(11) DEFAULT NULL,
  `CustReturnTrack` varchar(50) DEFAULT NULL,
  `ReceiveRetTime` datetime DEFAULT NULL,
  `ReceiveRetBy` int(11) DEFAULT NULL,
  `ReceiveRetFlag` int(11) DEFAULT NULL,
  `ASPMonth` int(11) DEFAULT NULL,
  `ASPYear` int(11) DEFAULT NULL,
  PRIMARY KEY (`AS_Problem_Id`),
  KEY `ExpressOrder_Id` (`ExpressOrder_Id`),
  KEY `SaleOrder_Id` (`SaleOrder_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `as_problem`
--

LOCK TABLES `as_problem` WRITE;
/*!40000 ALTER TABLE `as_problem` DISABLE KEYS */;
/*!40000 ALTER TABLE `as_problem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `as_problem_custom`
--

DROP TABLE IF EXISTS `as_problem_custom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `as_problem_custom` (
  `AS_Problem_Custom_Id` int(11) NOT NULL,
  `AS_Problem_Id` int(11) DEFAULT NULL,
  `AS_Problem_ExpService_Id` int(11) DEFAULT NULL,
  `CustomProdName` varchar(50) DEFAULT NULL,
  `CustomProdName_CN` varchar(50) DEFAULT NULL,
  `CustomQty` decimal(16,4) DEFAULT NULL,
  `CustomValue` decimal(16,4) DEFAULT NULL,
  `CustomCode` varchar(50) DEFAULT NULL,
  `FactoryCountry` int(11) DEFAULT NULL,
  `CustomMaterial` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`AS_Problem_Custom_Id`),
  KEY `AS_Problem_Id` (`AS_Problem_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `as_problem_custom`
--

LOCK TABLES `as_problem_custom` WRITE;
/*!40000 ALTER TABLE `as_problem_custom` DISABLE KEYS */;
/*!40000 ALTER TABLE `as_problem_custom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `as_problem_expservice`
--

DROP TABLE IF EXISTS `as_problem_expservice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `as_problem_expservice` (
  `AS_Problem_ExpService_Id` int(11) NOT NULL,
  `AS_Problem_Id` int(11) NOT NULL,
  `Weight` decimal(18,4) DEFAULT NULL,
  `Length` decimal(18,2) DEFAULT NULL,
  `Width` decimal(18,2) DEFAULT NULL,
  `Height` decimal(18,2) DEFAULT NULL,
  `IsTrack` int(11) DEFAULT NULL,
  `EstimatedShipTime` date DEFAULT NULL,
  `EstimatedArriveTime` date DEFAULT NULL,
  `LstSolution_Id` int(11) DEFAULT NULL,
  `LstCompanyName` varchar(50) DEFAULT NULL,
  `LstSolutionName` varchar(50) DEFAULT NULL,
  `ExpServiceCost` decimal(18,2) DEFAULT NULL,
  `RvFullName` varchar(255) DEFAULT NULL,
  `RvTel` varchar(50) DEFAULT NULL,
  `GlobalArea_Id` int(11) DEFAULT NULL,
  `RvProvince` varchar(50) DEFAULT NULL,
  `RvCity` varchar(50) DEFAULT NULL,
  `RvPostCode` varchar(50) DEFAULT NULL,
  `RvAddress_1` varchar(255) DEFAULT NULL,
  `RvAddress_2` varchar(255) DEFAULT NULL,
  `Warehouse_Id` int(11) DEFAULT NULL,
  PRIMARY KEY (`AS_Problem_ExpService_Id`),
  KEY `AS_Problem_Id` (`AS_Problem_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `as_problem_expservice`
--

LOCK TABLES `as_problem_expservice` WRITE;
/*!40000 ALTER TABLE `as_problem_expservice` DISABLE KEYS */;
/*!40000 ALTER TABLE `as_problem_expservice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `as_problem_prod`
--

DROP TABLE IF EXISTS `as_problem_prod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `as_problem_prod` (
  `AS_Problem_Prod_Id` int(11) NOT NULL,
  `AS_Problem_Id` int(11) NOT NULL,
  `Product_Id` int(11) DEFAULT NULL,
  `SkuProduct_Id` int(11) DEFAULT NULL,
  `SkuProdCode` varchar(50) DEFAULT NULL,
  `ProdName` varchar(255) DEFAULT NULL,
  `SkuProps` varchar(50) DEFAULT NULL,
  `ProdUnit` varchar(10) DEFAULT NULL,
  `Qty` decimal(18,2) DEFAULT NULL,
  `ReceiveRetQty` decimal(18,2) DEFAULT NULL,
  PRIMARY KEY (`AS_Problem_Prod_Id`),
  KEY `AS_Problem_Id` (`AS_Problem_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `as_problem_prod`
--

LOCK TABLES `as_problem_prod` WRITE;
/*!40000 ALTER TABLE `as_problem_prod` DISABLE KEYS */;
/*!40000 ALTER TABLE `as_problem_prod` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `as_problem_v`
--

DROP TABLE IF EXISTS `as_problem_v`;
/*!50001 DROP VIEW IF EXISTS `as_problem_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `as_problem_v` AS SELECT 
 1 AS `AS_Problem_Id`,
 1 AS `Customer_Id`,
 1 AS `SalePlatform_Id`,
 1 AS `SaleSite_Id`,
 1 AS `ASPCode`,
 1 AS `SaleOrder_Id`,
 1 AS `SOCode`,
 1 AS `ProblemType`,
 1 AS `CustReturn`,
 1 AS `ProblemRemark`,
 1 AS `HandleType`,
 1 AS `HandleRemark`,
 1 AS `Refund`,
 1 AS `SysCurrency_Id`,
 1 AS `State`,
 1 AS `IsResend`,
 1 AS `CreateTime`,
 1 AS `Creator`,
 1 AS `LastUpdatedTime`,
 1 AS `LastUpdatedBy`,
 1 AS `SubmitHandleTime`,
 1 AS `SubmitHandler`,
 1 AS `ExpressOrder_Id`,
 1 AS `CustReturnTrack`,
 1 AS `ReceiveRetTime`,
 1 AS `ReceiveRetBy`,
 1 AS `ReceiveRetFlag`,
 1 AS `ASPMonth`,
 1 AS `ASPYear`,
 1 AS `Email`,
 1 AS `CustName`,
 1 AS `RvAddressCount`,
 1 AS `RvFullName`,
 1 AS `IsTrack`,
 1 AS `ExpServiceCost`,
 1 AS `GlobalArea_Id`,
 1 AS `LRCode`,
 1 AS `EstimatedShipTime`,
 1 AS `EstimatedArriveTime`,
 1 AS `ShipTime`,
 1 AS `ArriveTime`,
 1 AS `TrackingNumber`,
 1 AS `EOState`,
 1 AS `LstSolution_Id`,
 1 AS `LstSolutionName`,
 1 AS `IsCombin`,
 1 AS `SO_ExpressOrder_Id`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `asp_finance_v`
--

DROP TABLE IF EXISTS `asp_finance_v`;
/*!50001 DROP VIEW IF EXISTS `asp_finance_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `asp_finance_v` AS SELECT 
 1 AS `AS_Problem_Id`,
 1 AS `BillType`,
 1 AS `Done`,
 1 AS `Remaining`,
 1 AS `PRFund`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `asp_product_v`
--

DROP TABLE IF EXISTS `asp_product_v`;
/*!50001 DROP VIEW IF EXISTS `asp_product_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `asp_product_v` AS SELECT 
 1 AS `SaleOrder_Id`,
 1 AS `SkuProduct_Id`,
 1 AS `Qty`,
 1 AS `ReceiveRetQty`,
 1 AS `RefundQty`,
 1 AS `ResendQty`,
 1 AS `OtherQty`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `automessagereply`
--

DROP TABLE IF EXISTS `automessagereply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `automessagereply` (
  `AutoMessageReply_Id` int(11) NOT NULL,
  `MeMessage` text,
  `CustMessage` text,
  `Action` int(11) DEFAULT NULL,
  PRIMARY KEY (`AutoMessageReply_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `automessagereply`
--

LOCK TABLES `automessagereply` WRITE;
/*!40000 ALTER TABLE `automessagereply` DISABLE KEYS */;
/*!40000 ALTER TABLE `automessagereply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `brand` (
  `Brand_Id` int(11) NOT NULL,
  `Seq` int(11) DEFAULT NULL,
  `LogoUrl` varchar(255) DEFAULT NULL,
  `BrandType_Id` int(11) DEFAULT NULL,
  `WebSite` varchar(50) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`Brand_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brand_res`
--

DROP TABLE IF EXISTS `brand_res`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `brand_res` (
  `Brand_Res_Id` int(11) NOT NULL,
  `Brand_Id` int(11) DEFAULT NULL,
  `LRCode` varchar(10) DEFAULT NULL,
  `BrandName` varchar(50) DEFAULT NULL,
  `Remark` text,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`Brand_Res_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand_res`
--

LOCK TABLES `brand_res` WRITE;
/*!40000 ALTER TABLE `brand_res` DISABLE KEYS */;
/*!40000 ALTER TABLE `brand_res` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brandtype`
--

DROP TABLE IF EXISTS `brandtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `brandtype` (
  `BrandType_Id` int(11) NOT NULL,
  `Seq` int(11) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`BrandType_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brandtype`
--

LOCK TABLES `brandtype` WRITE;
/*!40000 ALTER TABLE `brandtype` DISABLE KEYS */;
/*!40000 ALTER TABLE `brandtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brandtype_res`
--

DROP TABLE IF EXISTS `brandtype_res`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `brandtype_res` (
  `BrandType_Res_Id` int(11) NOT NULL,
  `BrandType_Id` int(11) DEFAULT NULL,
  `LRCode` varchar(10) DEFAULT NULL,
  `BrandTypeName` varchar(50) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`BrandType_Res_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brandtype_res`
--

LOCK TABLES `brandtype_res` WRITE;
/*!40000 ALTER TABLE `brandtype_res` DISABLE KEYS */;
/*!40000 ALTER TABLE `brandtype_res` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contracts`
--

DROP TABLE IF EXISTS `contracts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contracts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `job` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `customer_id` int(11) NOT NULL,
  `EnableFlag` int(2) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contracts`
--

LOCK TABLES `contracts` WRITE;
/*!40000 ALTER TABLE `contracts` DISABLE KEYS */;
INSERT INTO `contracts` VALUES (1,'���п�2','�з��ܼ�2','13510222018','dengshangjun2@hotmail.com',3,1),(2,'黄宝欢','程序员','18826241586','892163315@qq.com',7,1),(3,'��ΰΰ','����Ա','18826241586','892163315@qq.com',7,0),(4,'��ΰΰ','����Ա','18826241586','892163315@qq.com',7,0),(5,'林伟伟','程序员','18826241586','892163315@qq.com',7,0),(6,'黄宝欢','程序员','18826241586','892163315@qq.com',7,0),(7,'黄宝欢','程序员','18826241586','892163315@qq.com',7,0),(8,'baobao','销售','15119866161','2763222612@qq.com',10,1),(9,'林伟伟','销售','15915025890','892164475@qq.com',11,1);
/*!40000 ALTER TABLE `contracts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `costsubject`
--

DROP TABLE IF EXISTS `costsubject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `costsubject` (
  `CostSubject_Id` int(11) NOT NULL,
  `ParentCostSubject_Id` int(11) DEFAULT NULL,
  `Layer` int(11) DEFAULT NULL,
  `Seq` int(11) DEFAULT NULL,
  `CostSubjectIndexs` varchar(255) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`CostSubject_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `costsubject`
--

LOCK TABLES `costsubject` WRITE;
/*!40000 ALTER TABLE `costsubject` DISABLE KEYS */;
INSERT INTO `costsubject` VALUES (3,0,0,3,'',1),(5,3,1,5,'#3#',1),(8,3,1,6,'#3#',1),(9,0,0,4,'',1),(10,9,1,7,'#9#',1),(11,9,1,8,'#9#',1),(15,0,0,11,'',1),(19,0,0,13,'',1),(23,0,0,1,'',1),(24,0,0,2,'',1),(25,9,1,14,'#9#',1),(26,0,0,12,'',1),(27,26,1,15,'#26#',1),(28,26,1,16,'#26#',1),(29,26,1,17,'#26#',1),(30,26,1,18,'#26#',1),(31,26,1,19,'#26#',1),(32,26,1,20,'#26#',1);
/*!40000 ALTER TABLE `costsubject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `costsubject_res`
--

DROP TABLE IF EXISTS `costsubject_res`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `costsubject_res` (
  `CostSubject_Res_Id` int(11) NOT NULL,
  `CostSubject_Id` int(11) DEFAULT NULL,
  `LRCode` varchar(10) DEFAULT NULL,
  `CostSubjectName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`CostSubject_Res_Id`),
  KEY `CostSubject_Id` (`CostSubject_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `costsubject_res`
--

LOCK TABLES `costsubject_res` WRITE;
/*!40000 ALTER TABLE `costsubject_res` DISABLE KEYS */;
INSERT INTO `costsubject_res` VALUES (5,3,'zh-cn','营销费用'),(6,3,'en-us','销售费用'),(9,5,'zh-cn','ebay费用'),(10,5,'en-us','商品成交费'),(15,8,'zh-cn','推广费'),(16,8,'en-us','推广费'),(17,9,'zh-cn','运营管理成本'),(18,9,'en-us','运营管理成本'),(19,10,'zh-cn','软件费用'),(20,10,'en-us','内部系统维护费'),(21,11,'zh-cn','低值易耗'),(22,11,'en-us','低值易耗'),(29,15,'zh-cn','其他费用'),(30,15,'en-us','其他成本'),(37,19,'zh-cn','资金转出'),(38,19,'en-us','资金转出'),(45,23,'zh-cn','商品采购费'),(46,23,'en-us','商品采购成本'),(47,24,'zh-cn','快递费'),(48,24,'en-us','快递费'),(49,25,'zh-cn','人力综合成本'),(50,25,'en-us','人力综合成本'),(51,26,'zh-cn','客户退款'),(52,26,'en-us','客户退款'),(53,27,'zh-cn','订单变更'),(54,27,'en-us','订单变更'),(55,28,'zh-cn','快递包裹丢失'),(56,28,'en-us','快递丢包'),(57,29,'zh-cn','商品缺陷'),(58,29,'en-us','商品缺陷'),(59,30,'zh-cn','其他纠纷'),(60,30,'en-us','其他纠纷'),(61,31,'zh-cn','无理由退货'),(62,31,'en-us','无理由退货'),(63,32,'zh-cn','额外赔偿'),(64,32,'en-us','额外赔偿');
/*!40000 ALTER TABLE `costsubject_res` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `countrytax`
--

DROP TABLE IF EXISTS `countrytax`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `countrytax` (
  `CountryTax_Id` int(11) NOT NULL,
  `GlobalArea_Id` int(11) DEFAULT NULL,
  `TaxLimit` int(11) DEFAULT NULL,
  `SysCurrency_Id` int(11) DEFAULT NULL,
  PRIMARY KEY (`CountryTax_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countrytax`
--

LOCK TABLES `countrytax` WRITE;
/*!40000 ALTER TABLE `countrytax` DISABLE KEYS */;
/*!40000 ALTER TABLE `countrytax` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `countrytax_res`
--

DROP TABLE IF EXISTS `countrytax_res`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `countrytax_res` (
  `CountryTax_Res_Id` int(11) NOT NULL,
  `CountryTax_Id` int(11) DEFAULT NULL,
  `LRCode` varchar(10) DEFAULT NULL,
  `Remark` text,
  PRIMARY KEY (`CountryTax_Res_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countrytax_res`
--

LOCK TABLES `countrytax_res` WRITE;
/*!40000 ALTER TABLE `countrytax_res` DISABLE KEYS */;
/*!40000 ALTER TABLE `countrytax_res` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `countrytax_v`
--

DROP TABLE IF EXISTS `countrytax_v`;
/*!50001 DROP VIEW IF EXISTS `countrytax_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `countrytax_v` AS SELECT 
 1 AS `CountryTax_Id`,
 1 AS `GlobalArea_Id`,
 1 AS `GlobalAreaName`,
 1 AS `TaxLimit`,
 1 AS `Remark`,
 1 AS `SysCurrency_Id`,
 1 AS `CurrSymbol`,
 1 AS `LRCode`,
 1 AS `IsImportant`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
  `Customer_Id` int(11) NOT NULL,
  `Seq` int(11) DEFAULT NULL,
  `CustomerGroup_Id` int(11) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Tel` varchar(50) DEFAULT NULL,
  `ContactInfo` varchar(255) DEFAULT NULL,
  `Pwd` varchar(20) DEFAULT NULL,
  `CreateTime` datetime DEFAULT NULL,
  `UpdatedTime` datetime DEFAULT NULL,
  `User_Id` int(11) DEFAULT NULL,
  `GlobalArea_Id` int(11) DEFAULT NULL,
  `UpdatedBy` int(11) DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `SalePlatform_Id` int(11) DEFAULT NULL,
  `RvAddressCount` int(11) DEFAULT NULL,
  `CustKey` varchar(50) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  `ScriptVersion` int(11) DEFAULT NULL,
  `state` int(2) DEFAULT NULL COMMENT '状态：审核通过，未审核',
  `bizlic_url` varchar(255) DEFAULT NULL COMMENT '营业执照',
  `store_url` varchar(255) DEFAULT NULL COMMENT '店铺照片',
  `prestore_money` varchar(255) DEFAULT NULL COMMENT '预存资金',
  `pay_type` varchar(255) DEFAULT NULL COMMENT '支付方式',
  `jifen` int(11) DEFAULT NULL COMMENT '客户积分',
  PRIMARY KEY (`Customer_Id`),
  KEY `CustomerGroup_Id` (`CustomerGroup_Id`),
  KEY `Pwd` (`Pwd`),
  KEY `Email` (`Email`),
  KEY `CustKey` (`CustKey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (2,-1,1,'dengshangjun@hotmail.com','13510222019','','','2016-10-21 10:05:55',NULL,NULL,14,NULL,0,8,1,'���п�',0,1,2,NULL,NULL,NULL,NULL,NULL),(3,-1,1,'dengshangjun2@hotmail.com','13510222017','','','2016-10-21 10:27:48',NULL,NULL,14,NULL,0,8,1,'���п�2',0,1,2,NULL,NULL,NULL,NULL,NULL),(4,2,1,'xxx','xxxx','','','2016-10-22 14:25:12',NULL,NULL,122,0,1,8,1,'xxxxx',1,3,0,NULL,NULL,NULL,NULL,NULL),(5,3,1,'','','','','2016-10-22 14:43:22',NULL,NULL,122,NULL,1,0,0,'hxxx',1,1,0,NULL,NULL,NULL,NULL,NULL),(6,6,1,'','dsd','','','2016-10-22 14:46:21',NULL,NULL,122,0,1,8,0,'xxxxxsd',1,2,0,NULL,NULL,NULL,NULL,NULL),(7,1,1,'892163315@qq.com','18826241586','','123456','2016-10-22 14:49:00',NULL,NULL,14,0,0,8,1,'黄宝欢',1,10,2,NULL,NULL,NULL,NULL,NULL),(8,-1,0,'','','','','2016-10-22 16:03:30',NULL,NULL,0,NULL,0,0,0,'',0,1,2,NULL,NULL,NULL,NULL,NULL),(9,-1,0,'','','','','2016-10-22 18:01:16',NULL,NULL,0,NULL,0,0,0,'',0,1,2,NULL,NULL,NULL,NULL,NULL),(10,1,1,'2763222612@qq.com','15119866161','','bao123456','2016-10-25 16:15:06',NULL,NULL,14,0,0,8,1,'baobao',1,2,2,'http://lungu.go2ark.com/uploads/2016/10/25/9ea26d26a40e419798a3d9ae063a3aab.jpeg','http://lungu.go2ark.com/uploads/2016/10/25/7a9367ec7f044872bd25ed586e55851b.jpeg',NULL,NULL,NULL),(11,1,0,'892164475@qq.com','15915025890','','bao123456','2016-10-26 11:46:05',NULL,NULL,14,NULL,0,8,1,'林伟伟',1,1,2,'http://lungu.go2ark.com/uploads/2016/10/26/37cc3f37213043b49976268529bee313.jpeg','http://lungu.go2ark.com/uploads/2016/10/26/9f4c3a47fab442d8a304ebda6d35796b.jpeg',NULL,NULL,NULL);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_res`
--

DROP TABLE IF EXISTS `customer_res`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer_res` (
  `Customer_Res_Id` int(11) NOT NULL,
  `Customer_Id` int(11) DEFAULT NULL,
  `LRCode` varchar(10) DEFAULT NULL,
  `CustName` varchar(255) DEFAULT NULL,
  `Remark` text,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`Customer_Res_Id`),
  KEY `Customer_Id` (`Customer_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_res`
--

LOCK TABLES `customer_res` WRITE;
/*!40000 ALTER TABLE `customer_res` DISABLE KEYS */;
INSERT INTO `customer_res` VALUES (1,1,'zh-cn','1','',NULL),(2,1,'en-us','1','',NULL),(3,2,'zh-cn','���п�','',0),(4,2,'en-us','���п�','',0),(5,3,'zh-cn','���п�2','',0),(6,3,'en-us','���п�2','',0),(7,4,'zh-cn','xxxxx','',NULL),(8,4,'en-us','xxxxx','',NULL),(9,5,'zh-cn','hxxx','',NULL),(10,5,'en-us','hxxx','',NULL),(11,6,'zh-cn','xxxxxsd','',NULL),(12,6,'en-us','xxxxxsd','',NULL),(13,7,'zh-cn','黄宝欢','',NULL),(14,7,'en-us','黄宝欢','',NULL),(15,8,'zh-cn','','',0),(16,8,'en-us','','',0),(17,9,'zh-cn','','',0),(18,9,'en-us','','',0),(19,10,'zh-cn','baobao','',NULL),(20,10,'en-us','baobao','',NULL),(21,11,'zh-cn','林伟伟','',NULL),(22,11,'en-us','林伟伟','',NULL);
/*!40000 ALTER TABLE `customer_res` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_rvaddress`
--

DROP TABLE IF EXISTS `customer_rvaddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer_rvaddress` (
  `Customer_RvAddress_Id` int(11) NOT NULL,
  `Customer_Id` int(11) DEFAULT NULL,
  `RvSeq` int(11) DEFAULT NULL,
  `RvFullName` varchar(255) DEFAULT NULL,
  `RvTel` varchar(50) DEFAULT NULL,
  `GlobalArea_Id` int(11) DEFAULT NULL,
  `RvProvince` varchar(255) DEFAULT NULL,
  `RvCity` varchar(255) DEFAULT NULL,
  `RvPostCode` varchar(50) DEFAULT NULL,
  `RvAddress_1` varchar(255) DEFAULT NULL,
  `RvAddress_2` varchar(255) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  `type` int(2) DEFAULT NULL COMMENT '类型：客户收货地址；客户实际地址',
  PRIMARY KEY (`Customer_RvAddress_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_rvaddress`
--

LOCK TABLES `customer_rvaddress` WRITE;
/*!40000 ALTER TABLE `customer_rvaddress` DISABLE KEYS */;
INSERT INTO `customer_rvaddress` VALUES (1,1,1,'222','333',89,'','','518000','2222','33333',1,NULL),(2,2,-1,'���п�','13510222019',14,'','','518000','��������ɽ�����ϴ��10128��','�����Ļ���ҵ���ض���¥2403��',0,1),(3,3,-1,'���п�2','13510222018',14,'','','518000','��������ɽ�����ϴ��10128��','�����Ļ���ҵ���ض���¥2403��',0,1),(4,7,-1,'黄宝欢','18826241586',14,'','','','深圳市南山区深南大道10128号','数字文化产业基地东塔楼2403号',0,1),(5,7,-1,'��ΰΰ','18826241586',14,'','','','��������ɽ������ʱ����Ԣ1514��','��������ɽ������ʱ����Ԣ1514��',0,0),(6,7,-1,'��ΰΰ','18826241586',14,'','','','��������ɽ������ʱ����Ԣ1514��','��������ɽ������ʱ����Ԣ1514��',0,0),(7,7,-1,'林伟伟','18826241586',14,'','','','深圳市南山区海岸时代公寓1514号','深圳市南山区海岸时代公寓1514号',0,0),(8,7,-1,'黄宝欢','18826241586',14,'','','','深圳市南山区海岸时代公寓1514号','深圳市南山区海岸时代公寓1514号',0,0),(9,7,1,'黄宝欢','18826241586',14,'','','','深圳市南山区海岸时代公寓1514号','深圳市南山区海岸时代公寓1514号',1,0),(10,4,1,'xxx','xxx',122,'xxx','xxx','xxx','xxxxxxxxxxxx','',1,0),(11,10,1,'baobao','15119866161',14,'','','','士大夫的帅哥的帅哥的帅哥','',1,1),(12,11,1,'林伟伟','15915025890',14,NULL,NULL,NULL,'撒旦撒打发萨芬',NULL,1,1);
/*!40000 ALTER TABLE `customer_rvaddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `customer_v`
--

DROP TABLE IF EXISTS `customer_v`;
/*!50001 DROP VIEW IF EXISTS `customer_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `customer_v` AS SELECT 
 1 AS `Customer_Id`,
 1 AS `Seq`,
 1 AS `CustomerGroup_Id`,
 1 AS `Email`,
 1 AS `Tel`,
 1 AS `ContactInfo`,
 1 AS `Pwd`,
 1 AS `CreateTime`,
 1 AS `UpdatedTime`,
 1 AS `User_Id`,
 1 AS `GlobalArea_Id`,
 1 AS `UpdatedBy`,
 1 AS `CreatedBy`,
 1 AS `SalePlatform_Id`,
 1 AS `RvAddressCount`,
 1 AS `CustKey`,
 1 AS `EnableFlag`,
 1 AS `ScriptVersion`,
 1 AS `CustName`,
 1 AS `Remark`,
 1 AS `LRCode`,
 1 AS `state`,
 1 AS `bizlic_url`,
 1 AS `store_url`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `customergroup`
--

DROP TABLE IF EXISTS `customergroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customergroup` (
  `CustomerGroup_Id` int(11) NOT NULL,
  `Seq` int(11) DEFAULT NULL,
  `ParentCG_Id` int(11) DEFAULT NULL,
  PRIMARY KEY (`CustomerGroup_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customergroup`
--

LOCK TABLES `customergroup` WRITE;
/*!40000 ALTER TABLE `customergroup` DISABLE KEYS */;
INSERT INTO `customergroup` VALUES (1,1,NULL);
/*!40000 ALTER TABLE `customergroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customergroup_res`
--

DROP TABLE IF EXISTS `customergroup_res`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customergroup_res` (
  `CustomerGroup_Res_Id` int(11) NOT NULL,
  `CustomerGroup_Id` int(11) DEFAULT NULL,
  `LRCode` varchar(10) DEFAULT NULL,
  `CustomerGroupName` varchar(50) DEFAULT NULL,
  `Remark` text,
  PRIMARY KEY (`CustomerGroup_Res_Id`),
  KEY `CustomerGroup_Id` (`CustomerGroup_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customergroup_res`
--

LOCK TABLES `customergroup_res` WRITE;
/*!40000 ALTER TABLE `customergroup_res` DISABLE KEYS */;
INSERT INTO `customergroup_res` VALUES (1,1,'zh-cn','轮毂',''),(2,1,'en-us','轮毂','');
/*!40000 ALTER TABLE `customergroup_res` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eo_custom`
--

DROP TABLE IF EXISTS `eo_custom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `eo_custom` (
  `EO_Custom_Id` int(11) NOT NULL,
  `ExpressOrder_Id` int(11) NOT NULL,
  `CustomProdName` varchar(50) DEFAULT NULL,
  `CustomProdName_CN` varchar(50) DEFAULT NULL,
  `CustomQty` decimal(16,4) DEFAULT NULL,
  `CustomValue` decimal(16,4) DEFAULT NULL,
  `CustomCode` varchar(50) DEFAULT NULL,
  `FactoryCountry` int(11) DEFAULT NULL,
  `CustomMaterial` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`EO_Custom_Id`),
  KEY `ExpressOrder_Id` (`ExpressOrder_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eo_custom`
--

LOCK TABLES `eo_custom` WRITE;
/*!40000 ALTER TABLE `eo_custom` DISABLE KEYS */;
INSERT INTO `eo_custom` VALUES (1,1,'汽车轮毂-A','',1.0000,0.0000,'',0,'');
/*!40000 ALTER TABLE `eo_custom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eo_product`
--

DROP TABLE IF EXISTS `eo_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `eo_product` (
  `EO_Product_Id` int(11) NOT NULL,
  `ExpressOrder_Id` int(11) NOT NULL,
  `Product_Id` int(11) DEFAULT NULL,
  `SkuProduct_Id` int(11) DEFAULT NULL,
  `Qty` decimal(18,2) DEFAULT NULL,
  `Cost` decimal(18,2) DEFAULT NULL,
  `RevQty` decimal(18,2) DEFAULT NULL,
  `DamageQty` decimal(18,2) DEFAULT NULL,
  PRIMARY KEY (`EO_Product_Id`),
  KEY `ExpressOrder_Id` (`ExpressOrder_Id`),
  KEY `SkuProduct_Id` (`SkuProduct_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eo_product`
--

LOCK TABLES `eo_product` WRITE;
/*!40000 ALTER TABLE `eo_product` DISABLE KEYS */;
INSERT INTO `eo_product` VALUES (1,1,1,1,1.00,NULL,NULL,NULL);
/*!40000 ALTER TABLE `eo_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expressorder`
--

DROP TABLE IF EXISTS `expressorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `expressorder` (
  `ExpressOrder_Id` int(11) NOT NULL,
  `EOCode` varchar(50) DEFAULT NULL,
  `Weight` decimal(18,4) DEFAULT NULL,
  `Length` decimal(18,2) DEFAULT NULL,
  `Width` decimal(18,2) DEFAULT NULL,
  `Height` decimal(18,2) DEFAULT NULL,
  `IsTrack` int(11) DEFAULT NULL,
  `EstimatedShipTime` datetime DEFAULT NULL,
  `EstimatedArriveTime` datetime DEFAULT NULL,
  `ShipTime` datetime DEFAULT NULL,
  `ArriveTime` datetime DEFAULT NULL,
  `LstSolution_Id` int(11) DEFAULT NULL,
  `LstCompanyName` varchar(50) DEFAULT NULL,
  `LstSolutionName` varchar(50) DEFAULT NULL,
  `ExpServiceCost` decimal(18,2) DEFAULT NULL,
  `Customer_Id` int(11) DEFAULT NULL,
  `RvFullName` varchar(255) DEFAULT NULL,
  `RvTel` varchar(50) DEFAULT NULL,
  `GlobalArea_Id` int(11) DEFAULT NULL,
  `RvProvince` varchar(255) DEFAULT NULL,
  `RvCity` varchar(255) DEFAULT NULL,
  `RvPostCode` varchar(50) DEFAULT NULL,
  `RvAddress_1` varchar(255) DEFAULT NULL,
  `RvAddress_2` varchar(255) DEFAULT NULL,
  `ActualWeight` decimal(18,4) DEFAULT NULL,
  `ActualLength` decimal(18,2) DEFAULT NULL,
  `ActualWidth` decimal(18,2) DEFAULT NULL,
  `ActualHeight` decimal(18,2) DEFAULT NULL,
  `ActualCost` decimal(18,2) DEFAULT NULL,
  `TrackingNumber` varchar(50) DEFAULT NULL,
  `OutEOCode` varchar(50) DEFAULT NULL,
  `EOState` int(11) DEFAULT NULL,
  `ProductJson` text,
  `Warehouse_Id` int(11) DEFAULT NULL,
  `IsCombin` int(11) DEFAULT NULL,
  `IsReceiveRet` int(11) DEFAULT NULL,
  `ReceiveTime` datetime DEFAULT NULL,
  `ReceiveBy` int(11) DEFAULT NULL,
  `Product_Id` int(11) DEFAULT NULL,
  `SMTError` text,
  `CustName` varchar(255) DEFAULT NULL,
  `SMTPdfFile` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ExpressOrder_Id`),
  KEY `Warehouse_Id` (`Warehouse_Id`),
  KEY `EOState` (`EOState`),
  KEY `TrackingNumber` (`TrackingNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expressorder`
--

LOCK TABLES `expressorder` WRITE;
/*!40000 ALTER TABLE `expressorder` DISABLE KEYS */;
INSERT INTO `expressorder` VALUES (1,'EO00000001',1.0000,0.00,0.00,0.00,1,'2016-10-25 00:00:00','2016-11-24 00:00:00',NULL,NULL,1,'物流公司A','物流方案A',107.98,4,'xxx','xxx',122,'xxx','xxx','xxx','xxxxxxxxxxxx','',NULL,NULL,NULL,NULL,NULL,NULL,'',0,'[{\"EO_Product_Id\":1,\"ExpressOrder_Id\":1,\"Product_Id\":1,\"SkuProduct_Id\":1,\"Qty\":1.00,\"Cost\":null,\"RevQty\":null,\"DamageQty\":null,\"ProdName\":\"汽车轮毂-A\",\"Unit\":\"件\",\"SkuProdCode\":\"G000000002\",\"PV_Txt\":\"\",\"InventoryCost\":null,\"BrowsePicUrl\":null,\"SkuProps\":\"默认\"}]',1,0,NULL,NULL,NULL,1,NULL,'xxxxx',NULL);
/*!40000 ALTER TABLE `expressorder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expressorder_rel`
--

DROP TABLE IF EXISTS `expressorder_rel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `expressorder_rel` (
  `ExpressOrder_Rel_Id` int(11) NOT NULL,
  `SaleOrder_Id` int(11) DEFAULT NULL,
  `AS_Problem_Id` int(11) DEFAULT NULL,
  `ExpressOrder_Id` int(11) DEFAULT NULL,
  PRIMARY KEY (`ExpressOrder_Rel_Id`),
  KEY `SaleOrder_Id` (`SaleOrder_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expressorder_rel`
--

LOCK TABLES `expressorder_rel` WRITE;
/*!40000 ALTER TABLE `expressorder_rel` DISABLE KEYS */;
INSERT INTO `expressorder_rel` VALUES (1,1,0,1);
/*!40000 ALTER TABLE `expressorder_rel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `expressorder_v`
--

DROP TABLE IF EXISTS `expressorder_v`;
/*!50001 DROP VIEW IF EXISTS `expressorder_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `expressorder_v` AS SELECT 
 1 AS `ExpressOrder_Id`,
 1 AS `EOCode`,
 1 AS `Weight`,
 1 AS `Length`,
 1 AS `Width`,
 1 AS `Height`,
 1 AS `IsTrack`,
 1 AS `EstimatedShipTime`,
 1 AS `EstimatedArriveTime`,
 1 AS `ShipTime`,
 1 AS `ArriveTime`,
 1 AS `LstSolution_Id`,
 1 AS `LstCompanyName`,
 1 AS `LstSolutionName`,
 1 AS `ExpServiceCost`,
 1 AS `Customer_Id`,
 1 AS `RvFullName`,
 1 AS `RvTel`,
 1 AS `GlobalArea_Id`,
 1 AS `RvProvince`,
 1 AS `RvCity`,
 1 AS `RvPostCode`,
 1 AS `RvAddress_1`,
 1 AS `RvAddress_2`,
 1 AS `ActualWeight`,
 1 AS `ActualLength`,
 1 AS `ActualWidth`,
 1 AS `ActualHeight`,
 1 AS `ActualCost`,
 1 AS `TrackingNumber`,
 1 AS `OutEOCode`,
 1 AS `EOState`,
 1 AS `ProductJson`,
 1 AS `Warehouse_Id`,
 1 AS `IsCombin`,
 1 AS `IsReceiveRet`,
 1 AS `ReceiveTime`,
 1 AS `ReceiveBy`,
 1 AS `Product_Id`,
 1 AS `SMTError`,
 1 AS `CustName`,
 1 AS `SMTPdfFile`,
 1 AS `AreaIndexs`,
 1 AS `WHIndexs`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `expressservice`
--

DROP TABLE IF EXISTS `expressservice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `expressservice` (
  `ExpressService_Id` int(11) NOT NULL,
  `Warehouse_Id` int(11) DEFAULT NULL,
  `GlobalArea_Ids` text,
  `FromWeight` decimal(18,4) DEFAULT NULL,
  `IncreaseWeight` decimal(18,4) DEFAULT NULL,
  `MaxWeight` decimal(18,4) DEFAULT NULL,
  `FromPrice` decimal(18,3) DEFAULT NULL,
  `IncreasePrice` decimal(18,3) DEFAULT NULL,
  `SalePlatform_Id` int(11) DEFAULT NULL,
  `SaleSite_Id` int(11) DEFAULT NULL,
  `ESType` int(11) DEFAULT NULL,
  `MinDeliveryTime` int(11) DEFAULT NULL,
  `MaxDeliveryTime` int(11) DEFAULT NULL,
  `IsTrack` int(11) DEFAULT NULL,
  `LstSolution_Ids` varchar(255) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`ExpressService_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expressservice`
--

LOCK TABLES `expressservice` WRITE;
/*!40000 ALTER TABLE `expressservice` DISABLE KEYS */;
INSERT INTO `expressservice` VALUES (1,1,'#122#',0.0000,0.0000,5.0000,0.000,0.000,8,4,2,10,30,1,'#1#',1);
/*!40000 ALTER TABLE `expressservice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expressservice_res`
--

DROP TABLE IF EXISTS `expressservice_res`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `expressservice_res` (
  `ExpressService_Res_Id` int(11) NOT NULL,
  `ExpressService_Id` int(11) DEFAULT NULL,
  `LRCode` varchar(10) DEFAULT NULL,
  `ExpressServiceName` varchar(50) DEFAULT NULL,
  `Remark` text,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`ExpressService_Res_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expressservice_res`
--

LOCK TABLES `expressservice_res` WRITE;
/*!40000 ALTER TABLE `expressservice_res` DISABLE KEYS */;
INSERT INTO `expressservice_res` VALUES (1,1,'zh-cn','经济型快递服务','',1),(2,1,'en-us','经济型快递服务','',1);
/*!40000 ALTER TABLE `expressservice_res` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expressservicearea`
--

DROP TABLE IF EXISTS `expressservicearea`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `expressservicearea` (
  `ExpressServiceArea_Id` int(11) NOT NULL,
  `ExpressService_Id` int(11) DEFAULT NULL,
  `GlobalArea_Id` int(11) DEFAULT NULL,
  PRIMARY KEY (`ExpressServiceArea_Id`),
  KEY `ExpressService_Id` (`ExpressService_Id`),
  KEY `GlobalArea_Id` (`GlobalArea_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expressservicearea`
--

LOCK TABLES `expressservicearea` WRITE;
/*!40000 ALTER TABLE `expressservicearea` DISABLE KEYS */;
INSERT INTO `expressservicearea` VALUES (1,1,122);
/*!40000 ALTER TABLE `expressservicearea` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `financereport_time_v`
--

DROP TABLE IF EXISTS `financereport_time_v`;
/*!50001 DROP VIEW IF EXISTS `financereport_time_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `financereport_time_v` AS SELECT 
 1 AS `Year`,
 1 AS `Month`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `fundaccount`
--

DROP TABLE IF EXISTS `fundaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fundaccount` (
  `FundAccount_Id` int(11) NOT NULL,
  `Seq` int(11) DEFAULT NULL,
  `FundAccount` varchar(50) DEFAULT NULL,
  `Owner` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`FundAccount_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fundaccount`
--

LOCK TABLES `fundaccount` WRITE;
/*!40000 ALTER TABLE `fundaccount` DISABLE KEYS */;
/*!40000 ALTER TABLE `fundaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fundaccount_res`
--

DROP TABLE IF EXISTS `fundaccount_res`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fundaccount_res` (
  `FundAccount_Res_Id` int(11) NOT NULL,
  `FundAccount_Id` int(11) DEFAULT NULL,
  `LRCode` varchar(10) DEFAULT NULL,
  `BankName` varchar(50) DEFAULT NULL,
  `Remark` text,
  PRIMARY KEY (`FundAccount_Res_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fundaccount_res`
--

LOCK TABLES `fundaccount_res` WRITE;
/*!40000 ALTER TABLE `fundaccount_res` DISABLE KEYS */;
/*!40000 ALTER TABLE `fundaccount_res` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fundflowrecord`
--

DROP TABLE IF EXISTS `fundflowrecord`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fundflowrecord` (
  `FundFlowRecord_Id` int(11) NOT NULL,
  `AccountOutRecord_Id` int(11) DEFAULT NULL,
  `AccountInRecord_Id` int(11) DEFAULT NULL,
  `FFRCode` varchar(10) DEFAULT NULL,
  `FlowFund` decimal(18,2) DEFAULT NULL,
  `LosedFund` decimal(18,2) DEFAULT NULL,
  `FundAccount_Id` int(11) DEFAULT NULL,
  `SysCurrency_Id` int(11) DEFAULT NULL,
  `Rate` decimal(18,4) DEFAULT NULL,
  `PRFund` decimal(18,2) DEFAULT NULL,
  `OperateTime` datetime DEFAULT NULL,
  `OperateBy` int(11) DEFAULT NULL,
  `AccountYear` int(11) DEFAULT NULL,
  `AccountMonth` int(11) DEFAULT NULL,
  `FromSource` varchar(50) DEFAULT NULL,
  `SIKey` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`FundFlowRecord_Id`),
  KEY `AccountInRecord_Id` (`AccountInRecord_Id`),
  KEY `AccountOutRecord_Id` (`AccountOutRecord_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fundflowrecord`
--

LOCK TABLES `fundflowrecord` WRITE;
/*!40000 ALTER TABLE `fundflowrecord` DISABLE KEYS */;
/*!40000 ALTER TABLE `fundflowrecord` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `fundflowrecord_v`
--

DROP TABLE IF EXISTS `fundflowrecord_v`;
/*!50001 DROP VIEW IF EXISTS `fundflowrecord_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `fundflowrecord_v` AS SELECT 
 1 AS `FundFlowRecord_Id`,
 1 AS `AccountOutRecord_Id`,
 1 AS `AccountInRecord_Id`,
 1 AS `FFRCode`,
 1 AS `FlowFund`,
 1 AS `LosedFund`,
 1 AS `FundAccount_Id`,
 1 AS `SysCurrency_Id`,
 1 AS `Rate`,
 1 AS `PRFund`,
 1 AS `OperateTime`,
 1 AS `OperateBy`,
 1 AS `AccountYear`,
 1 AS `AccountMonth`,
 1 AS `FromSource`,
 1 AS `SIKey`,
 1 AS `FundAccount`,
 1 AS `CurrSymbol`,
 1 AS `ObjCode`,
 1 AS `FullName`,
 1 AS `AORCurrSymbol`,
 1 AS `CurrName`,
 1 AS `AORCurrName`,
 1 AS `FundLRCode`,
 1 AS `OjbLRCode`,
 1 AS `AO_SaleOrder_Id`,
 1 AS `AI_SaleOrder_Id`,
 1 AS `AO_AS_Problem_Id`,
 1 AS `AI_AS_Problem_Id`,
 1 AS `AO_PurchaseOrder_Id`,
 1 AS `AI_PurchaseOrder_Id`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `fundtransferrecord`
--

DROP TABLE IF EXISTS `fundtransferrecord`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fundtransferrecord` (
  `FundTransferRecord_Id` int(11) NOT NULL,
  `FTRCode` varchar(10) DEFAULT NULL,
  `OutFundAccount_Id` int(11) DEFAULT NULL,
  `OutSysCurrency_Id` int(11) DEFAULT NULL,
  `OutFund` decimal(18,2) DEFAULT NULL,
  `InFundAccount_Id` int(11) DEFAULT NULL,
  `InSysCurrency_Id` int(11) DEFAULT NULL,
  `InFund` decimal(18,2) DEFAULT NULL,
  `LosedFund` decimal(18,2) DEFAULT NULL,
  `Rate` decimal(18,4) DEFAULT NULL,
  `OperateBy` int(11) DEFAULT NULL,
  `OperateTime` datetime DEFAULT NULL,
  `OutFundTime` datetime DEFAULT NULL,
  `OutFundYear` int(11) DEFAULT NULL,
  `OutFundMonth` int(11) DEFAULT NULL,
  `InFundTime` datetime DEFAULT NULL,
  `InFundYear` int(11) DEFAULT NULL,
  `InFundMonth` int(11) DEFAULT NULL,
  PRIMARY KEY (`FundTransferRecord_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fundtransferrecord`
--

LOCK TABLES `fundtransferrecord` WRITE;
/*!40000 ALTER TABLE `fundtransferrecord` DISABLE KEYS */;
/*!40000 ALTER TABLE `fundtransferrecord` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `fundtransferrecord_v`
--

DROP TABLE IF EXISTS `fundtransferrecord_v`;
/*!50001 DROP VIEW IF EXISTS `fundtransferrecord_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `fundtransferrecord_v` AS SELECT 
 1 AS `FundTransferRecord_Id`,
 1 AS `FTRCode`,
 1 AS `OutFundAccount_Id`,
 1 AS `OutSysCurrency_Id`,
 1 AS `OutFund`,
 1 AS `InFundAccount_Id`,
 1 AS `InSysCurrency_Id`,
 1 AS `InFund`,
 1 AS `LosedFund`,
 1 AS `Rate`,
 1 AS `OperateBy`,
 1 AS `OperateTime`,
 1 AS `OutFundTime`,
 1 AS `OutFundYear`,
 1 AS `OutFundMonth`,
 1 AS `InFundTime`,
 1 AS `InFundYear`,
 1 AS `InFundMonth`,
 1 AS `OutFundAccount`,
 1 AS `OutCurrSymbol`,
 1 AS `OutCurrName`,
 1 AS `InFundAccount`,
 1 AS `InCurrSymbol`,
 1 AS `InCurrName`,
 1 AS `FullName`,
 1 AS `LRCode`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `globalarea`
--

DROP TABLE IF EXISTS `globalarea`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `globalarea` (
  `GlobalArea_Id` int(11) NOT NULL,
  `ParentArea_Id` int(11) DEFAULT NULL,
  `Layer` int(11) DEFAULT NULL,
  `AreaIndexs` varchar(255) DEFAULT NULL,
  `AreaType` int(11) DEFAULT NULL,
  `IsImportant` int(11) DEFAULT NULL,
  `PYType` varchar(1) DEFAULT NULL,
  `SonAreaCount` int(11) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  `GACode` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`GlobalArea_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `globalarea`
--

LOCK TABLES `globalarea` WRITE;
/*!40000 ALTER TABLE `globalarea` DISABLE KEYS */;
INSERT INTO `globalarea` VALUES (1,0,0,'',0,0,'A',49,1,NULL),(2,0,0,'',0,0,'',45,1,NULL),(3,0,0,'',0,0,'A',22,1,NULL),(4,0,0,'',0,0,'A',12,1,NULL),(5,0,0,'',0,0,'',12,1,NULL),(6,1,1,'#1#',1,0,'A',0,1,NULL),(7,1,1,'#1#',1,0,'A',0,1,NULL),(8,1,1,'#1#',1,0,'Y',0,1,NULL),(9,1,1,'#1#',1,0,'B',0,1,NULL),(10,1,1,'#1#',1,0,'M',0,1,NULL),(11,1,1,'#1#',1,0,'B',0,1,NULL),(12,1,1,'#1#',1,0,'W',0,1,NULL),(13,1,1,'#1#',1,0,'J',0,1,NULL),(14,1,1,'#1#',1,1,'Z',31,1,NULL),(15,1,1,'#1#',1,0,'S',0,0,NULL),(16,1,1,'#1#',1,0,'G',0,1,NULL),(17,1,1,'#1#',1,0,'Y',0,1,NULL),(18,1,1,'#1#',1,0,'Y',0,1,NULL),(19,1,1,'#1#',1,0,'Y',0,1,NULL),(20,1,1,'#1#',1,0,'Y',0,1,NULL),(21,1,1,'#1#',1,1,'Y',6,1,NULL),(22,1,1,'#1#',1,0,'R',0,1,NULL),(23,1,1,'#1#',1,0,'Y',0,1,NULL),(24,1,1,'#1#',1,0,'H',0,1,NULL),(25,1,1,'#1#',1,0,'C',0,1,NULL),(26,1,1,'#1#',1,0,'H',0,1,NULL),(27,1,1,'#1#',1,0,'K',0,1,NULL),(28,1,1,'#1#',1,0,'J',0,1,NULL),(29,1,1,'#1#',1,0,'L',0,1,NULL),(30,1,1,'#1#',1,0,'L',0,1,NULL),(31,1,1,'#1#',1,0,'M',0,1,NULL),(32,1,1,'#1#',1,0,'M',0,1,NULL),(33,1,1,'#1#',1,0,'M',0,1,NULL),(34,1,1,'#1#',1,0,'M',0,1,NULL),(35,1,1,'#1#',1,0,'N',0,1,NULL),(36,1,1,'#1#',1,0,'A',0,1,NULL),(37,1,1,'#1#',1,0,'B',0,1,NULL),(38,1,1,'#1#',1,0,'F',0,1,NULL),(39,1,1,'#1#',1,0,'K',0,1,NULL),(40,1,1,'#1#',1,0,'S',0,1,NULL),(41,1,1,'#1#',1,0,'X',0,1,NULL),(42,1,1,'#1#',1,0,'S',0,1,NULL),(43,1,1,'#1#',1,0,'X',0,1,NULL),(44,1,1,'#1#',1,0,'T',0,1,NULL),(45,1,1,'#1#',1,0,'T',0,1,NULL),(46,1,1,'#1#',1,0,'D',0,1,NULL),(47,1,1,'#1#',1,0,'T',0,1,NULL),(48,1,1,'#1#',1,0,'T',0,1,NULL),(49,1,1,'#1#',1,0,'A',0,1,NULL),(50,1,1,'#1#',1,0,'W',0,1,NULL),(51,1,1,'#1#',1,0,'Y',0,1,NULL),(52,1,1,'#1#',1,0,'Y',0,1,NULL),(53,1,1,'#1#',1,0,'Z',0,1,NULL),(54,1,1,'#1#',1,0,'Z',0,1,NULL),(55,1,1,'#1#',1,0,'Z',0,1,NULL),(56,2,1,'#2#',1,0,'A',0,1,NULL),(57,2,1,'#2#',1,0,'A',0,1,NULL),(58,2,1,'#2#',1,0,'A',0,1,NULL),(59,2,1,'#2#',1,0,'B',0,1,NULL),(60,2,1,'#2#',1,0,'B',0,1,NULL),(61,2,1,'#2#',1,0,'B',0,1,NULL),(62,2,1,'#2#',1,0,'B',0,1,NULL),(63,2,1,'#2#',1,0,'K',0,1,NULL),(64,2,1,'#2#',1,0,'J',0,1,NULL),(65,2,1,'#2#',1,0,'D',0,1,NULL),(66,2,1,'#2#',1,0,'A',0,1,NULL),(67,2,1,'#2#',1,0,'F',0,1,NULL),(68,2,1,'#2#',1,0,'F',0,1,NULL),(69,2,1,'#2#',1,0,'D',0,1,NULL),(70,2,1,'#2#',1,0,'X',0,1,NULL),(71,2,1,'#2#',1,0,'X',0,1,NULL),(72,2,1,'#2#',1,0,'B',0,1,NULL),(73,2,1,'#2#',1,0,'A',0,1,NULL),(74,2,1,'#2#',1,0,'Y',0,1,NULL),(75,2,1,'#2#',1,0,'L',0,1,NULL),(76,2,1,'#2#',1,0,'L',0,1,NULL),(77,2,1,'#2#',1,0,'L',0,1,NULL),(78,2,1,'#2#',1,0,'L',0,1,NULL),(79,2,1,'#2#',1,0,'M',0,1,NULL),(80,2,1,'#2#',1,0,'M',0,1,NULL),(81,2,1,'#2#',1,0,'M',0,1,NULL),(82,2,1,'#2#',1,0,'M',0,1,NULL),(83,2,1,'#2#',1,0,'H',0,1,NULL),(84,2,1,'#2#',1,0,'H',0,1,NULL),(85,2,1,'#2#',1,0,'N',0,1,NULL),(86,2,1,'#2#',1,0,'B',0,1,NULL),(87,2,1,'#2#',1,0,'P',0,1,NULL),(88,2,1,'#2#',1,0,'L',0,1,NULL),(89,2,1,'#2#',1,1,'E',0,1,NULL),(90,2,1,'#2#',1,0,'S',0,1,NULL),(91,2,1,'#2#',1,0,'S',0,1,NULL),(92,2,1,'#2#',1,0,'S',0,1,NULL),(93,2,1,'#2#',1,0,'S',0,1,NULL),(94,2,1,'#2#',1,0,'X',0,1,NULL),(95,2,1,'#2#',1,0,'R',0,1,NULL),(96,2,1,'#2#',1,0,'R',0,1,NULL),(97,2,1,'#2#',1,0,'W',0,1,NULL),(98,2,1,'#2#',1,1,'Y',4,1,NULL),(99,2,1,'#2#',1,0,'F',0,1,NULL),(100,3,1,'#3#',1,0,'A',0,1,NULL),(101,3,1,'#3#',1,0,'B',0,1,NULL),(102,3,1,'#3#',1,0,'B',0,1,NULL),(103,3,1,'#3#',1,0,'B',0,1,NULL),(104,3,1,'#3#',1,1,'J',10,1,NULL),(105,3,1,'#3#',1,0,'G',0,1,NULL),(106,3,1,'#3#',1,0,'G',0,1,NULL),(107,3,1,'#3#',1,0,'D',0,1,NULL),(108,3,1,'#3#',1,0,'D',0,1,NULL),(109,3,1,'#3#',1,0,'S',0,1,NULL),(110,3,1,'#3#',1,0,'G',0,1,NULL),(111,3,1,'#3#',1,0,'W',0,1,NULL),(112,3,1,'#3#',1,0,'H',0,1,NULL),(113,3,1,'#3#',1,0,'H',0,1,NULL),(114,3,1,'#3#',1,0,'Y',0,1,NULL),(115,3,1,'#3#',1,0,'M',0,1,NULL),(116,3,1,'#3#',1,0,'N',0,1,NULL),(117,3,1,'#3#',1,0,'B',0,1,NULL),(119,3,1,'#3#',1,0,'S',0,1,NULL),(121,3,1,'#3#',1,0,'T',0,1,NULL),(122,3,1,'#3#',1,1,'M',51,1,NULL),(123,4,1,'#4#',1,0,'A',0,1,NULL),(124,4,1,'#4#',1,0,'B',0,1,NULL),(125,4,1,'#4#',1,0,'B',0,1,NULL),(126,4,1,'#4#',1,0,'Z',0,1,NULL),(127,4,1,'#4#',1,0,'G',0,1,NULL),(128,4,1,'#4#',1,0,'E',0,1,NULL),(129,4,1,'#4#',1,0,'G',0,1,NULL),(130,4,1,'#4#',1,0,'B',0,1,NULL),(131,4,1,'#4#',1,0,'M',0,1,NULL),(132,4,1,'#4#',1,0,'S',0,1,NULL),(133,4,1,'#4#',1,0,'W',0,1,NULL),(134,4,1,'#4#',1,0,'W',0,1,NULL),(135,5,1,'#5#',1,1,'A',7,1,NULL),(136,5,1,'#5#',1,0,'F',0,1,NULL),(137,5,1,'#5#',1,0,'J',0,1,NULL),(138,5,1,'#5#',1,0,'M',0,1,NULL),(139,5,1,'#5#',1,0,'M',0,1,NULL),(140,5,1,'#5#',1,0,'M',0,1,NULL),(141,5,1,'#5#',1,0,'X',0,1,NULL),(143,5,1,'#5#',1,0,'B',0,1,NULL),(144,5,1,'#5#',1,0,'S',0,1,NULL),(146,5,1,'#5#',1,0,'T',0,1,NULL),(147,5,1,'#5#',1,0,'T',0,1,NULL),(148,5,1,'#5#',1,0,'W',0,1,NULL),(149,0,0,'',0,0,'',51,1,NULL),(150,149,1,'#149#',1,0,'A',0,1,NULL),(151,149,1,'#149#',1,0,'A',0,1,NULL),(153,149,1,'#149#',1,0,'B',0,1,NULL),(154,149,1,'#149#',1,0,'B',0,1,NULL),(155,149,1,'#149#',1,0,'B',0,1,NULL),(156,149,1,'#149#',1,0,'B',0,1,NULL),(157,149,1,'#149#',1,0,'K',0,1,NULL),(158,149,1,'#149#',1,0,'F',0,1,NULL),(159,149,1,'#149#',1,0,'Z',0,1,NULL),(160,149,1,'#149#',1,0,'Z',0,1,NULL),(161,149,1,'#149#',1,0,'K',0,1,NULL),(162,149,1,'#149#',1,0,'G',0,1,NULL),(163,149,1,'#149#',1,0,'G',0,1,NULL),(165,149,1,'#149#',1,0,'J',0,1,NULL),(166,149,1,'#149#',1,0,'A',0,1,NULL),(167,149,1,'#149#',1,0,'C',0,1,NULL),(168,149,1,'#149#',1,0,'E',0,1,NULL),(169,149,1,'#149#',1,0,'A',0,1,NULL),(170,149,1,'#149#',1,0,'J',0,1,NULL),(171,149,1,'#149#',1,0,'G',0,1,NULL),(172,149,1,'#149#',1,0,'J',0,1,NULL),(173,149,1,'#149#',1,0,'J',0,1,NULL),(174,149,1,'#149#',1,0,'J',0,1,NULL),(175,149,1,'#149#',1,0,'K',0,1,NULL),(176,149,1,'#149#',1,0,'L',0,1,NULL),(177,149,1,'#149#',1,0,'L',0,1,NULL),(178,149,1,'#149#',1,0,'L',0,1,NULL),(179,149,1,'#149#',1,0,'M',0,1,NULL),(180,149,1,'#149#',1,0,'M',0,1,NULL),(181,149,1,'#149#',1,0,'M',0,1,NULL),(182,149,1,'#149#',1,0,'M',0,1,NULL),(183,149,1,'#149#',1,0,'M',0,1,NULL),(184,149,1,'#149#',1,0,'M',0,1,NULL),(185,149,1,'#149#',1,0,'M',0,1,NULL),(186,149,1,'#149#',1,0,'N',0,1,NULL),(187,149,1,'#149#',1,0,'N',0,1,NULL),(188,149,1,'#149#',1,0,'N',0,1,NULL),(189,149,1,'#149#',1,0,'L',0,1,NULL),(191,149,1,'#149#',1,0,'S',0,1,NULL),(192,149,1,'#149#',1,0,'S',0,1,NULL),(193,149,1,'#149#',1,0,'S',0,1,NULL),(194,149,1,'#149#',1,0,'S',0,1,NULL),(195,149,1,'#149#',1,0,'N',0,1,NULL),(196,149,1,'#149#',1,0,'S',0,1,NULL),(197,149,1,'#149#',1,0,'S',0,1,NULL),(198,149,1,'#149#',1,0,'T',0,1,NULL),(199,149,1,'#149#',1,0,'D',0,1,NULL),(200,149,1,'#149#',1,0,'T',0,1,NULL),(201,149,1,'#149#',1,0,'W',0,1,NULL),(202,149,1,'#149#',1,0,'Z',0,1,NULL),(203,149,1,'#149#',1,0,'J',0,1,NULL),(204,104,2,'#3#,#104#',2,0,NULL,0,1,NULL),(205,104,2,'#3#,#104#',2,0,NULL,0,1,NULL),(206,104,2,'#3#,#104#',2,0,NULL,0,1,NULL),(207,104,2,'#3#,#104#',2,0,NULL,0,1,NULL),(208,104,2,'#3#,#104#',2,0,NULL,0,1,NULL),(209,104,2,'#3#,#104#',2,0,NULL,0,1,NULL),(210,104,2,'#3#,#104#',2,0,NULL,0,1,NULL),(211,104,2,'#3#,#104#',2,0,NULL,0,1,NULL),(212,104,2,'#3#,#104#',2,0,NULL,0,1,NULL),(213,104,2,'#3#,#104#',2,0,NULL,0,1,NULL),(214,14,2,'#1#,#14#',2,0,NULL,0,1,NULL),(215,14,2,'#1#,#14#',2,0,NULL,0,1,NULL),(216,14,2,'#1#,#14#',2,0,NULL,0,1,NULL),(217,14,2,'#1#,#14#',2,0,NULL,0,1,NULL),(218,14,2,'#1#,#14#',2,0,NULL,0,1,NULL),(219,14,2,'#1#,#14#',2,0,NULL,0,1,NULL),(220,14,2,'#1#,#14#',2,0,NULL,0,1,NULL),(221,14,2,'#1#,#14#',2,0,NULL,0,1,NULL),(222,14,2,'#1#,#14#',2,0,NULL,0,1,NULL),(223,14,2,'#1#,#14#',2,0,NULL,0,1,NULL),(224,14,2,'#1#,#14#',2,0,NULL,0,1,NULL),(225,14,2,'#1#,#14#',2,0,NULL,0,1,NULL),(227,14,2,'#1#,#14#',2,0,NULL,2,1,NULL),(228,14,2,'#1#,#14#',2,0,NULL,0,1,NULL),(229,14,2,'#1#,#14#',2,0,NULL,0,1,NULL),(232,14,2,'#1#,#14#',2,0,NULL,0,1,NULL),(233,14,2,'#1#,#14#',2,0,NULL,0,1,NULL),(234,14,2,'#1#,#14#',2,0,NULL,0,1,NULL),(235,14,2,'#1#,#14#',2,0,NULL,0,1,NULL),(236,14,2,'#1#,#14#',2,0,NULL,0,1,NULL),(237,14,2,'#1#,#14#',2,0,NULL,0,1,NULL),(238,14,2,'#1#,#14#',2,0,NULL,0,1,NULL),(239,14,2,'#1#,#14#',2,0,NULL,0,1,NULL),(240,14,2,'#1#,#14#',2,0,NULL,0,1,NULL),(241,14,2,'#1#,#14#',2,0,NULL,0,1,NULL),(242,14,2,'#1#,#14#',2,0,NULL,0,1,NULL),(243,14,2,'#1#,#14#',2,0,NULL,0,1,NULL),(244,14,2,'#1#,#14#',2,0,NULL,0,1,NULL),(245,14,2,'#1#,#14#',2,0,NULL,0,1,NULL),(246,14,2,'#1#,#14#',2,0,NULL,0,1,NULL),(247,14,2,'#1#,#14#',2,0,NULL,0,1,NULL),(248,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(249,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(250,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(251,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(252,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(253,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(254,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(255,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(256,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(257,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(258,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(259,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(260,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(261,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(262,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(263,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(264,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(265,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(266,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(267,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(268,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(269,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(270,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(271,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(272,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(273,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(274,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(275,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(276,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(277,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(278,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(279,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(280,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(281,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(282,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(283,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(284,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(285,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(286,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(287,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(288,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(289,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(290,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(291,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(292,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(293,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(294,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(295,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(296,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(297,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(298,122,2,'#3#,#122#',2,0,NULL,0,1,NULL),(299,98,2,'#2#,#98#',2,0,NULL,0,1,NULL),(300,98,2,'#2#,#98#',2,0,NULL,0,1,NULL),(301,98,2,'#2#,#98#',2,0,NULL,0,1,NULL),(302,98,2,'#2#,#98#',2,0,NULL,0,1,NULL),(303,21,2,'#1#,#21#',2,0,NULL,0,1,NULL),(304,21,2,'#1#,#21#',2,0,NULL,0,1,NULL),(305,21,2,'#1#,#21#',2,0,NULL,0,1,NULL),(306,21,2,'#1#,#21#',2,0,NULL,0,1,NULL),(307,21,2,'#1#,#21#',2,0,NULL,0,1,NULL),(308,21,2,'#1#,#21#',2,0,NULL,0,1,NULL),(309,135,2,'#5#,#135#',2,0,NULL,0,1,NULL),(310,135,2,'#5#,#135#',2,0,NULL,0,1,NULL),(311,135,2,'#5#,#135#',2,0,NULL,0,1,NULL),(312,135,2,'#5#,#135#',2,0,NULL,0,1,NULL),(313,135,2,'#5#,#135#',2,0,NULL,0,1,NULL),(314,135,2,'#5#,#135#',2,0,NULL,0,1,NULL),(315,135,2,'#5#,#135#',2,0,NULL,0,1,NULL),(316,3,1,'#3#',1,0,'B',0,1,NULL),(317,2,1,'#2#',1,0,'S',0,1,NULL),(318,227,3,'#1#,#14#,#227#',2,0,NULL,0,1,NULL),(319,227,3,'#1#,#14#,#227#',2,0,NULL,0,1,NULL);
/*!40000 ALTER TABLE `globalarea` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `globalarea_res`
--

DROP TABLE IF EXISTS `globalarea_res`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `globalarea_res` (
  `GlobalArea_Res_Id` int(11) NOT NULL,
  `GlobalArea_Id` int(11) DEFAULT NULL,
  `LRCode` varchar(10) DEFAULT NULL,
  `GlobalAreaName` varchar(50) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`GlobalArea_Res_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `globalarea_res`
--

LOCK TABLES `globalarea_res` WRITE;
/*!40000 ALTER TABLE `globalarea_res` DISABLE KEYS */;
INSERT INTO `globalarea_res` VALUES (1,1,'zh-cn','亚洲',1),(2,1,'en-us','Asia',1),(3,2,'zh-cn','欧洲',1),(4,2,'en-us','Europe',1),(5,3,'zh-cn','北美洲',1),(6,3,'en-us','North America',1),(7,4,'zh-cn','南美洲',1),(8,4,'en-us','South America',1),(9,5,'zh-cn','大洋洲',1),(10,5,'en-us','Oceania',1),(11,6,'zh-cn','阿富汗',1),(12,6,'en-us','Afghanistan',1),(13,7,'zh-cn','阿塞拜疆',1),(14,7,'en-us','Azerbaijan',1),(15,8,'zh-cn','亚美尼亚',1),(16,8,'en-us','Armenia',1),(17,9,'zh-cn','巴林',1),(18,9,'en-us','Bahrain',1),(19,10,'zh-cn','孟加拉',1),(20,10,'en-us','Bangladesh',1),(21,11,'zh-cn','不丹',1),(22,11,'en-us','Bhutan',1),(23,12,'zh-cn','文莱',1),(24,12,'en-us','Brunei',1),(25,13,'zh-cn','柬埔寨',1),(26,13,'en-us','Cambodia',1),(27,14,'zh-cn','中国',1),(28,14,'en-us','China',1),(29,15,'zh-cn','塞浦路斯(Deleted)',1),(30,15,'en-us','Cyprus',1),(31,16,'zh-cn','格鲁吉亚',1),(32,16,'en-us','Georgia',1),(33,17,'zh-cn','印度',1),(34,17,'en-us','India',1),(35,18,'zh-cn','印度尼西亚',1),(36,18,'en-us','Indonesia',1),(37,19,'zh-cn','伊朗',1),(38,19,'en-us','Iran',1),(39,20,'zh-cn','伊拉克',1),(40,20,'en-us','Iraq',1),(41,21,'zh-cn','以色列',1),(42,21,'en-us','Israel',1),(43,22,'zh-cn','日本',1),(44,22,'en-us','Japan',1),(45,23,'zh-cn','约旦',1),(46,23,'en-us','Jordan',1),(47,24,'zh-cn','哈萨克斯坦',1),(48,24,'en-us','Kazakhstan',1),(49,25,'zh-cn','朝鲜',1),(50,25,'en-us','North Korea',1),(51,26,'zh-cn','韩国',1),(52,26,'en-us','South Korea',1),(53,27,'zh-cn','科威特',1),(54,27,'en-us','Kuwait',1),(55,28,'zh-cn','吉尔吉斯斯坦',1),(56,28,'en-us','Kyrgyzstan',1),(57,29,'zh-cn','老挝',1),(58,29,'en-us','Laos',1),(59,30,'zh-cn','黎巴嫩',1),(60,30,'en-us','Lebanon',1),(61,31,'zh-cn','马来西亚',1),(62,31,'en-us','Malaysia',1),(63,32,'zh-cn','马尔代夫',1),(64,32,'en-us','Maldives',1),(65,33,'zh-cn','蒙古',1),(66,33,'en-us','Mongolia',1),(67,34,'zh-cn','缅甸',1),(68,34,'en-us','Myanmar',1),(69,35,'zh-cn','尼泊尔',1),(70,35,'en-us','Nepal',1),(71,36,'zh-cn','阿曼',1),(72,36,'en-us','Oman',1),(73,37,'zh-cn','巴基斯坦',1),(74,37,'en-us','Pakistan',1),(75,38,'zh-cn','菲律宾',1),(76,38,'en-us','Philippines',1),(77,39,'zh-cn','卡塔尔',1),(78,39,'en-us','Qatar',1),(79,40,'zh-cn','沙特阿拉伯',1),(80,40,'en-us','Saudi Arabia',1),(81,41,'zh-cn','新加坡',1),(82,41,'en-us','Singapore',1),(83,42,'zh-cn','斯里兰卡',1),(84,42,'en-us','Sri Lanka',1),(85,43,'zh-cn','叙利亚',1),(86,43,'en-us','Syria',1),(87,44,'zh-cn','塔吉克斯坦',1),(88,44,'en-us','Tajikistan',1),(89,45,'zh-cn','泰国',1),(90,45,'en-us','Thailand',1),(91,46,'zh-cn','东帝汶',1),(92,46,'en-us','East Timor',1),(93,47,'zh-cn','土耳其',1),(94,47,'en-us','Turkey',1),(95,48,'zh-cn','土库曼斯坦',1),(96,48,'en-us','Turkmenistan',1),(97,49,'zh-cn','阿联酋',1),(98,49,'en-us','United Arab Emirates',1),(99,50,'zh-cn','乌兹别克斯坦',1),(100,50,'en-us','Uzbekistan',1),(101,51,'zh-cn','越南',1),(102,51,'en-us','Vietnam',1),(103,52,'zh-cn','也门',1),(104,52,'en-us','Yemen',1),(105,53,'zh-cn','中国香港',1),(106,53,'en-us','Hong Kong',1),(107,54,'zh-cn','中国澳门',1),(108,54,'en-us','Macau',1),(109,55,'zh-cn','中国台湾',1),(110,55,'en-us','Taiwan',1),(111,56,'zh-cn','阿尔巴尼亚',1),(112,56,'en-us','Albania',1),(113,57,'zh-cn','安道尔',1),(114,57,'en-us','Andorra',1),(115,58,'zh-cn','奥地利',1),(116,58,'en-us','Austria',1),(117,59,'zh-cn','白俄罗斯',1),(118,59,'en-us','Belarus',1),(119,60,'zh-cn','比利时',1),(120,60,'en-us','Belgium',1),(121,61,'zh-cn','波黑',1),(122,61,'en-us','Bosnia and Herzegovina',1),(123,62,'zh-cn','保加利亚',1),(124,62,'en-us','Bulgaria',1),(125,63,'zh-cn','克罗地亚',1),(126,63,'en-us','Croatia',1),(127,64,'zh-cn','捷克',1),(128,64,'en-us','Czech Republic',1),(129,65,'zh-cn','丹麦',1),(130,65,'en-us','Denmark',1),(131,66,'zh-cn','爱沙尼亚',1),(132,66,'en-us','Estonia',1),(133,67,'zh-cn','芬兰',1),(134,67,'en-us','Finland',1),(135,68,'zh-cn','法国',1),(136,68,'en-us','France',1),(137,69,'zh-cn','德国',1),(138,69,'en-us','Germany',1),(139,70,'zh-cn','希腊',1),(140,70,'en-us','Greece',1),(141,71,'zh-cn','匈牙利',1),(142,71,'en-us','Hungary',1),(143,72,'zh-cn','冰岛',1),(144,72,'en-us','Iceland',1),(145,73,'zh-cn','爱尔兰',1),(146,73,'en-us','Ireland',1),(147,74,'zh-cn','意大利',1),(148,74,'en-us','Italy',1),(149,75,'zh-cn','拉脱维亚',1),(150,75,'en-us','Latvia',1),(151,76,'zh-cn','列支敦士登',1),(152,76,'en-us','Liechtenstein',1),(153,77,'zh-cn','立陶宛',1),(154,77,'en-us','Lithuania',1),(155,78,'zh-cn','卢森堡',1),(156,78,'en-us','Luxembourg',1),(157,79,'zh-cn','马其顿共和国',1),(158,79,'en-us','Macedonia',1),(159,80,'zh-cn','马耳他',1),(160,80,'en-us','Malta',1),(161,81,'zh-cn','摩尔多瓦',1),(162,81,'en-us','Moldova',1),(163,82,'zh-cn','摩纳哥',1),(164,82,'en-us','Monaco',1),(165,83,'zh-cn','黑山共和国',1),(166,83,'en-us','Montenegro',1),(167,84,'zh-cn','荷兰',1),(168,84,'en-us','Netherlands',1),(169,85,'zh-cn','挪威',1),(170,85,'en-us','Norway',1),(171,86,'zh-cn','波兰',1),(172,86,'en-us','Poland',1),(173,87,'zh-cn','葡萄牙',1),(174,87,'en-us','Portugal',1),(175,88,'zh-cn','罗马尼亚',1),(176,88,'en-us','Romania',1),(177,89,'zh-cn','俄罗斯',1),(178,89,'en-us','Russia',1),(179,90,'zh-cn','圣马力诺',1),(180,90,'en-us','San Marino',1),(181,91,'zh-cn','塞尔维亚',1),(182,91,'en-us','Serbia',1),(183,92,'zh-cn','斯洛伐克',1),(184,92,'en-us','Slovakia',1),(185,93,'zh-cn','斯洛文尼亚',1),(186,93,'en-us','Slovenia',1),(187,94,'zh-cn','西班牙',1),(188,94,'en-us','Spain',1),(189,95,'zh-cn','瑞典',1),(190,95,'en-us','Sweden',1),(191,96,'zh-cn','瑞士',1),(192,96,'en-us','Switzerland',1),(193,97,'zh-cn','乌克兰',1),(194,97,'en-us','Ukraine',1),(195,98,'zh-cn','英国',1),(196,98,'en-us','United Kingdom',1),(197,99,'zh-cn','梵蒂冈',1),(198,99,'en-us','Vatican',1),(199,100,'zh-cn','安提瓜和巴布达',1),(200,100,'en-us','Antigua and Barbuda',1),(201,101,'zh-cn','巴哈马',1),(202,101,'en-us','Bahamas',1),(203,102,'zh-cn','巴巴多斯',1),(204,102,'en-us','Barbados',1),(205,103,'zh-cn','伯利兹',1),(206,103,'en-us','Belize',1),(207,104,'zh-cn','加拿大',1),(208,104,'en-us','Canada',1),(209,105,'zh-cn','哥斯达黎加',1),(210,105,'en-us','Costa Rica',1),(211,106,'zh-cn','古巴',1),(212,106,'en-us','Cuba',1),(213,107,'zh-cn','多米尼克',1),(214,107,'en-us','Dominica',1),(215,108,'zh-cn','多米尼加',1),(216,108,'en-us','Dominican Republic',1),(217,109,'zh-cn','萨尔瓦多',1),(218,109,'en-us','El Salvador',1),(219,110,'zh-cn','格林纳达',1),(220,110,'en-us','Grenada',1),(221,111,'zh-cn','危地马拉',1),(222,111,'en-us','Guatemala',1),(223,112,'zh-cn','海地',1),(224,112,'en-us','Haiti',1),(225,113,'zh-cn','洪都拉斯',1),(226,113,'en-us','Honduras',1),(227,114,'zh-cn','牙买加',1),(228,114,'en-us','Jamaica',1),(229,115,'zh-cn','墨西哥',1),(230,115,'en-us','Mexico',1),(231,116,'zh-cn','尼加拉瓜',1),(232,116,'en-us','Nicaragua',1),(233,117,'zh-cn','巴拿马',1),(234,117,'en-us','Panama',1),(237,119,'zh-cn','圣卢西亚',1),(238,119,'en-us','Saint Lucia',1),(241,121,'zh-cn','特立尼达和多巴哥',1),(242,121,'en-us','Trinidad and Tobago',1),(243,122,'zh-cn','美国',1),(244,122,'en-us','United States',1),(245,123,'zh-cn','阿根廷',1),(246,123,'en-us','Argentina',1),(247,124,'zh-cn','玻利维亚',1),(248,124,'en-us','Bolivia',1),(249,125,'zh-cn','巴西',1),(250,125,'en-us','Brazil',1),(251,126,'zh-cn','智利',1),(252,126,'en-us','Chile',1),(253,127,'zh-cn','哥伦比亚',1),(254,127,'en-us','Colombia',1),(255,128,'zh-cn','厄瓜多尔',1),(256,128,'en-us','Ecuador',1),(257,129,'zh-cn','圭亚那',1),(258,129,'en-us','Guyana',1),(259,130,'zh-cn','巴拉圭',1),(260,130,'en-us','Paraguay',1),(261,131,'zh-cn','秘鲁',1),(262,131,'en-us','Peru',1),(263,132,'zh-cn','苏里南',1),(264,132,'en-us','Suriname',1),(265,133,'zh-cn','乌拉圭',1),(266,133,'en-us','Uruguay',1),(267,134,'zh-cn','委内瑞拉',1),(268,134,'en-us','Venezuela',1),(269,135,'zh-cn','澳大利亚',1),(270,135,'en-us','Australia',1),(271,136,'zh-cn','斐济',1),(272,136,'en-us','Fiji',1),(273,137,'zh-cn','基里巴斯',1),(274,137,'en-us','Kiribati',1),(275,138,'zh-cn','马绍尔群岛',1),(276,138,'en-us','Marshall Islands',1),(277,139,'zh-cn','密克罗尼西亚',1),(278,139,'en-us','Micronesia',1),(279,140,'zh-cn','瑙鲁',1),(280,140,'en-us','Nauru',1),(281,141,'zh-cn','新西兰',1),(282,141,'en-us','New Zealand',1),(285,143,'zh-cn','巴布亚新几内亚',1),(286,143,'en-us','Papua New Guinea',1),(287,144,'zh-cn','萨摩亚',1),(288,144,'en-us','Samoa',1),(291,146,'zh-cn','汤加',1),(292,146,'en-us','Tonga',1),(293,147,'zh-cn','图瓦卢',1),(294,147,'en-us','Tuvalu',1),(295,148,'zh-cn','瓦努阿图',1),(296,148,'en-us','Vanuatu',1),(297,149,'zh-cn','非洲',1),(298,149,'en-us','Africa',1),(299,150,'zh-cn','阿尔及利亚',1),(300,150,'en-us','Algeria',1),(301,151,'zh-cn','安哥拉',1),(302,151,'en-us','Angola',1),(305,153,'zh-cn','贝宁',1),(306,153,'en-us','Benin',1),(307,154,'zh-cn','博茨瓦纳',1),(308,154,'en-us','Botswana',1),(309,155,'zh-cn','布基纳法索',1),(310,155,'en-us','Burkina Faso',1),(311,156,'zh-cn','布隆迪',1),(312,156,'en-us','Burundi',1),(313,157,'zh-cn','喀麦隆',1),(314,157,'en-us','Cameroon',1),(315,158,'zh-cn','佛得角',1),(316,158,'en-us','Cape Verde',1),(317,159,'zh-cn','中非共和国',1),(318,159,'en-us','Central African Republic',1),(319,160,'zh-cn','乍得',1),(320,160,'en-us','Chad',1),(321,161,'zh-cn','科摩罗',1),(322,161,'en-us','Comoros',1),(323,162,'zh-cn','刚果民主共和国',1),(324,162,'en-us','Congo',1),(325,163,'zh-cn','刚果共和国',1),(326,163,'en-us','Republic of the Congo',1),(329,165,'zh-cn','吉布提',1),(330,165,'en-us','Djibouti',1),(331,166,'zh-cn','埃及',1),(332,166,'en-us','Egypt',1),(333,167,'zh-cn','赤道几内亚',1),(334,167,'en-us','Equatorial Guinea',1),(335,168,'zh-cn','厄立特里亚',1),(336,168,'en-us','Eritrea',1),(337,169,'zh-cn','埃塞俄比亚',1),(338,169,'en-us','Ethiopia',1),(339,170,'zh-cn','加蓬',1),(340,170,'en-us','Gabon',1),(341,171,'zh-cn','冈比亚',1),(342,171,'en-us','Gambia',1),(343,172,'zh-cn','加纳',1),(344,172,'en-us','Ghana',1),(345,173,'zh-cn','几内亚',1),(346,173,'en-us','Guinea',1),(347,174,'zh-cn','几内亚比绍',1),(348,174,'en-us','Guinea-Bissau',1),(349,175,'zh-cn','肯尼亚',1),(350,175,'en-us','Kenya',1),(351,176,'zh-cn','莱索托',1),(352,176,'en-us','Lesotho',1),(353,177,'zh-cn','利比里亚',1),(354,177,'en-us','Liberia',1),(355,178,'zh-cn','利比亚',1),(356,178,'en-us','Libya',1),(357,179,'zh-cn','马达加斯加',1),(358,179,'en-us','Madagascar',1),(359,180,'zh-cn','马拉维',1),(360,180,'en-us','Malawi',1),(361,181,'zh-cn','马里',1),(362,181,'en-us','Mali',1),(363,182,'zh-cn','毛里塔尼亚',1),(364,182,'en-us','Mauritania',1),(365,183,'zh-cn','毛里求斯',1),(366,183,'en-us','Mauritius',1),(367,184,'zh-cn','摩洛哥',1),(368,184,'en-us','Morocco',1),(369,185,'zh-cn','莫桑比克',1),(370,185,'en-us','Mozambique',1),(371,186,'zh-cn','纳米比亚',1),(372,186,'en-us','Namibia',1),(373,187,'zh-cn','尼日尔',1),(374,187,'en-us','Niger',1),(375,188,'zh-cn','尼日利亚',1),(376,188,'en-us','Nigeria',1),(377,189,'zh-cn','卢旺达',1),(378,189,'en-us','Rwanda',1),(381,191,'zh-cn','塞内加尔',1),(382,191,'en-us','Senegal',1),(383,192,'zh-cn','塞舌尔',1),(384,192,'en-us','Seychelles',1),(385,193,'zh-cn','塞拉利昂',1),(386,193,'en-us','Sierra Leone',1),(387,194,'zh-cn','索马里',1),(388,194,'en-us','Somalia',1),(389,195,'zh-cn','南非',1),(390,195,'en-us','South Africa',1),(391,196,'zh-cn','苏丹',1),(392,196,'en-us','Sudan',1),(393,197,'zh-cn','斯威士兰',1),(394,197,'en-us','Swaziland',1),(395,198,'zh-cn','坦桑尼亚',1),(396,198,'en-us','Tanzania',1),(397,199,'zh-cn','多哥',1),(398,199,'en-us','Togo',1),(399,200,'zh-cn','突尼斯',1),(400,200,'en-us','Tunisia',1),(401,201,'zh-cn','乌干达',1),(402,201,'en-us','Uganda',1),(403,202,'zh-cn','赞比亚',1),(404,202,'en-us','Zambia',1),(405,203,'zh-cn','津巴布韦',1),(406,203,'en-us','Zimbabwe',1),(407,204,'zh-cn','安大略(ON)',1),(408,204,'en-us','安大略(ON)',1),(409,205,'zh-cn','魁北克(QC)',1),(410,205,'en-us','魁北克(QC)',1),(411,206,'zh-cn','新斯科舍(NS)',1),(412,206,'en-us','新斯科舍(NS)',1),(413,207,'zh-cn','新不伦瑞克(NB)',1),(414,207,'en-us','新不伦瑞克(NB)',1),(415,208,'zh-cn','马尼托巴(MB)',1),(416,208,'en-us','马尼托巴(MB)',1),(417,209,'zh-cn','不列颠哥伦比亚(BC)',1),(418,209,'en-us','不列颠哥伦比亚(BC)',1),(419,210,'zh-cn','爱德华王子岛(PE)',1),(420,210,'en-us','爱德华王子岛(PE)',1),(421,211,'zh-cn','萨斯喀彻温(SK)',1),(422,211,'en-us','萨斯喀彻温(SK)',1),(423,212,'zh-cn','阿尔伯塔(AB)',1),(424,212,'en-us','阿尔伯塔(AB)',1),(425,213,'zh-cn','纽芬兰与拉布拉多(NL)',1),(426,213,'en-us','纽芬兰与拉布拉多(NL)',1),(427,214,'zh-cn','北京',1),(428,214,'en-us','北京',1),(429,215,'zh-cn','天津',1),(430,215,'en-us','天津',1),(431,216,'zh-cn','河北',1),(432,216,'en-us','河北',1),(433,217,'zh-cn','山西',1),(434,217,'en-us','山西',1),(435,218,'zh-cn','内蒙古',1),(436,218,'en-us','内蒙古',1),(437,219,'zh-cn','山东',1),(438,219,'en-us','山东',1),(439,220,'zh-cn','江苏',1),(440,220,'en-us','江苏',1),(441,221,'zh-cn','安徽',1),(442,221,'en-us','安徽',1),(443,222,'zh-cn','上海',1),(444,222,'en-us','上海',1),(445,223,'zh-cn','浙江',1),(446,223,'en-us','浙江',1),(447,224,'zh-cn','江西',1),(448,224,'en-us','江西',1),(449,225,'zh-cn','福建',1),(450,225,'en-us','福建',1),(453,227,'zh-cn','广东',1),(454,227,'en-us','广东',1),(455,228,'zh-cn','广西',1),(456,228,'en-us','广西',1),(457,229,'zh-cn','海南',1),(458,229,'en-us','海南',1),(463,232,'zh-cn','黑龙江',1),(464,232,'en-us','黑龙江',1),(465,233,'zh-cn','吉林',1),(466,233,'en-us','吉林',1),(467,234,'zh-cn','辽宁',1),(468,234,'en-us','辽宁',1),(469,235,'zh-cn','新疆',1),(470,235,'en-us','新疆',1),(471,236,'zh-cn','甘肃',1),(472,236,'en-us','甘肃',1),(473,237,'zh-cn','宁夏',1),(474,237,'en-us','宁夏',1),(475,238,'zh-cn','青海',1),(476,238,'en-us','青海',1),(477,239,'zh-cn','陕西',1),(478,239,'en-us','陕西',1),(479,240,'zh-cn','重庆',1),(480,240,'en-us','重庆',1),(481,241,'zh-cn','四川',1),(482,241,'en-us','四川',1),(483,242,'zh-cn','贵州',1),(484,242,'en-us','贵州',1),(485,243,'zh-cn','云南',1),(486,243,'en-us','云南',1),(487,244,'zh-cn','西藏',1),(488,244,'en-us','西藏',1),(489,245,'zh-cn','河南',1),(490,245,'en-us','河南',1),(491,246,'zh-cn','湖北',1),(492,246,'en-us','湖北',1),(493,247,'zh-cn','湖南',1),(494,247,'en-us','湖南',1),(495,248,'zh-cn','亚拉巴马州',1),(496,248,'en-us','亚拉巴马州',1),(497,249,'zh-cn','阿拉斯加州',1),(498,249,'en-us','阿拉斯加州',1),(499,250,'zh-cn','亚利桑那州',1),(500,250,'en-us','亚利桑那州',1),(501,251,'zh-cn','阿肯色州',1),(502,251,'en-us','阿肯色州',1),(503,252,'zh-cn','加利福尼亚州',1),(504,252,'en-us','加利福尼亚州',1),(505,253,'zh-cn','科罗拉多州',1),(506,253,'en-us','科罗拉多州',1),(507,254,'zh-cn','康涅狄格州',1),(508,254,'en-us','康涅狄格州',1),(509,255,'zh-cn','特拉华州',1),(510,255,'en-us','特拉华州',1),(511,256,'zh-cn','佛罗利达州',1),(512,256,'en-us','佛罗利达州',1),(513,257,'zh-cn','佐治亚州',1),(514,257,'en-us','佐治亚州',1),(515,258,'zh-cn','夏威夷州',1),(516,258,'en-us','夏威夷州',1),(517,259,'zh-cn','爱达荷州',1),(518,259,'en-us','爱达荷州',1),(519,260,'zh-cn','伊利诺伊州',1),(520,260,'en-us','伊利诺伊州',1),(521,261,'zh-cn','印第安纳州',1),(522,261,'en-us','印第安纳州',1),(523,262,'zh-cn','艾奥瓦州',1),(524,262,'en-us','艾奥瓦州',1),(525,263,'zh-cn','堪萨斯州',1),(526,263,'en-us','堪萨斯州',1),(527,264,'zh-cn','肯塔基州',1),(528,264,'en-us','肯塔基州',1),(529,265,'zh-cn','路易斯安那州',1),(530,265,'en-us','路易斯安那州',1),(531,266,'zh-cn','缅因州',1),(532,266,'en-us','缅因州',1),(533,267,'zh-cn','马里兰州',1),(534,267,'en-us','马里兰州',1),(535,268,'zh-cn','马萨诸塞州',1),(536,268,'en-us','马萨诸塞州',1),(537,269,'zh-cn','密歇根州',1),(538,269,'en-us','密歇根州',1),(539,270,'zh-cn','明尼苏达州',1),(540,270,'en-us','明尼苏达州',1),(541,271,'zh-cn','密西西比州',1),(542,271,'en-us','密西西比州',1),(543,272,'zh-cn','密苏里州',1),(544,272,'en-us','密苏里州',1),(545,273,'zh-cn','蒙大拿州',1),(546,273,'en-us','蒙大拿州',1),(547,274,'zh-cn','内布拉斯加州',1),(548,274,'en-us','内布拉斯加州',1),(549,275,'zh-cn','内华达州',1),(550,275,'en-us','内华达州',1),(551,276,'zh-cn','新罕布什尔州',1),(552,276,'en-us','新罕布什尔州',1),(553,277,'zh-cn','新泽西州',1),(554,277,'en-us','新泽西州',1),(555,278,'zh-cn','新墨西哥州',1),(556,278,'en-us','新墨西哥州',1),(557,279,'zh-cn','纽约州',1),(558,279,'en-us','纽约州',1),(559,280,'zh-cn','北卡罗来纳州',1),(560,280,'en-us','北卡罗来纳州',1),(561,281,'zh-cn','北达科他州',1),(562,281,'en-us','北达科他州',1),(563,282,'zh-cn','俄亥俄州',1),(564,282,'en-us','俄亥俄州',1),(565,283,'zh-cn','俄克拉何马州',1),(566,283,'en-us','俄克拉何马州',1),(567,284,'zh-cn','俄勒冈州',1),(568,284,'en-us','俄勒冈州',1),(569,285,'zh-cn','宾夕法尼亚州',1),(570,285,'en-us','宾夕法尼亚州',1),(571,286,'zh-cn','罗得岛州',1),(572,286,'en-us','罗得岛州',1),(573,287,'zh-cn','南卡罗来纳州',1),(574,287,'en-us','南卡罗来纳州',1),(575,288,'zh-cn','南达科他州',1),(576,288,'en-us','南达科他州',1),(577,289,'zh-cn','田纳西州',1),(578,289,'en-us','田纳西州',1),(579,290,'zh-cn','得克萨斯州',1),(580,290,'en-us','得克萨斯州',1),(581,291,'zh-cn','犹他州',1),(582,291,'en-us','犹他州',1),(583,292,'zh-cn','佛蒙特州',1),(584,292,'en-us','佛蒙特州',1),(585,293,'zh-cn','弗吉尼亚州',1),(586,293,'en-us','弗吉尼亚州',1),(587,294,'zh-cn','华盛顿州',1),(588,294,'en-us','华盛顿州',1),(589,295,'zh-cn','西弗吉尼亚州',1),(590,295,'en-us','西弗吉尼亚州',1),(591,296,'zh-cn','威斯康星州',1),(592,296,'en-us','威斯康星州',1),(593,297,'zh-cn','怀俄明州',1),(594,297,'en-us','怀俄明州',1),(595,298,'zh-cn','华盛顿哥伦比亚特区',1),(596,298,'en-us','华盛顿哥伦比亚特区',1),(597,299,'zh-cn','英格兰',1),(598,299,'en-us','英格兰',1),(599,300,'zh-cn','威尔士',1),(600,300,'en-us','威尔士',1),(601,301,'zh-cn','苏格兰',1),(602,301,'en-us','苏格兰',1),(603,302,'zh-cn','北爱尔兰',1),(604,302,'en-us','北爱尔兰',1),(605,303,'zh-cn','耶路撒冷区',1),(606,303,'en-us','耶路撒冷区',1),(607,304,'zh-cn','北部区',1),(608,304,'en-us','北部区',1),(609,305,'zh-cn','海法区',1),(610,305,'en-us','海法区',1),(611,306,'zh-cn','中央区',1),(612,306,'en-us','中央区',1),(613,307,'zh-cn','特拉维夫区',1),(614,307,'en-us','特拉维夫区',1),(615,308,'zh-cn','南部区',1),(616,308,'en-us','南部区',1),(617,309,'zh-cn','新南威尔士',1),(618,309,'en-us','新南威尔士',1),(619,310,'zh-cn','北领地',1),(620,310,'en-us','北领地',1),(621,311,'zh-cn','昆士兰',1),(622,311,'en-us','昆士兰',1),(623,312,'zh-cn','南澳大利亚',1),(624,312,'en-us','南澳大利亚',1),(625,313,'zh-cn','塔斯曼尼亚',1),(626,313,'en-us','塔斯曼尼亚',1),(627,314,'zh-cn','维多利亚',1),(628,314,'en-us','维多利亚',1),(629,315,'zh-cn','西澳大利亚',1),(630,315,'en-us','西澳大利亚',1),(631,316,'zh-cn','波多黎各',1),(632,316,'en-us','Puerto Rico',1),(633,317,'zh-cn','塞浦路斯',1),(634,317,'en-us','塞浦路斯',1),(635,318,'zh-cn','深圳',1),(636,318,'en-us','深圳',1),(637,319,'zh-cn','广州',1),(638,319,'en-us','广州',1);
/*!40000 ALTER TABLE `globalarea_res` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inoutstock`
--

DROP TABLE IF EXISTS `inoutstock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inoutstock` (
  `InOutStock_Id` int(11) NOT NULL,
  `From_Warehouse_Id` int(11) DEFAULT NULL,
  `To_Warehouse_Id` int(11) DEFAULT NULL,
  `Action` int(11) DEFAULT NULL,
  `StockInType` int(11) DEFAULT NULL,
  `Remark` varchar(255) DEFAULT NULL,
  `OperatedBy` int(11) DEFAULT NULL,
  `OperatedTime` datetime DEFAULT NULL,
  `AS_Problem_Id` int(11) DEFAULT NULL,
  `ASPCode` varchar(50) DEFAULT NULL,
  `PurchaseOrder_Id` int(11) DEFAULT NULL,
  `POCode` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`InOutStock_Id`),
  KEY `PurchaseOrder_Id` (`PurchaseOrder_Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inoutstock`
--

LOCK TABLES `inoutstock` WRITE;
/*!40000 ALTER TABLE `inoutstock` DISABLE KEYS */;
/*!40000 ALTER TABLE `inoutstock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inoutstock_item`
--

DROP TABLE IF EXISTS `inoutstock_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inoutstock_item` (
  `InOutStock_Item_Id` int(11) NOT NULL,
  `InOutStock_Id` varchar(45) DEFAULT NULL,
  `Product_Id` varchar(45) DEFAULT NULL,
  `SkuProduct_Id` varchar(45) DEFAULT NULL,
  `Qty` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`InOutStock_Item_Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inoutstock_item`
--

LOCK TABLES `inoutstock_item` WRITE;
/*!40000 ALTER TABLE `inoutstock_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `inoutstock_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `inoutstock_v`
--

DROP TABLE IF EXISTS `inoutstock_v`;
/*!50001 DROP VIEW IF EXISTS `inoutstock_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `inoutstock_v` AS SELECT 
 1 AS `InOutStock_Id`,
 1 AS `From_Warehouse_Id`,
 1 AS `To_Warehouse_Id`,
 1 AS `Action`,
 1 AS `StockInType`,
 1 AS `Remark`,
 1 AS `OperatedBy`,
 1 AS `OperatedTime`,
 1 AS `AS_Problem_Id`,
 1 AS `ASPCode`,
 1 AS `PurchaseOrder_Id`,
 1 AS `POCode`,
 1 AS `InOutStock_Item_Id`,
 1 AS `Qty`,
 1 AS `Product_Id`,
 1 AS `ProdName`,
 1 AS `SkuProduct_Id`,
 1 AS `Unit`,
 1 AS `SkuProdCode`,
 1 AS `PropValues`,
 1 AS `PV_Txt`,
 1 AS `Product_Pic_Id`,
 1 AS `SkuSeq`,
 1 AS `FullName`,
 1 AS `LRCode`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventory` (
  `Inventory_Id` int(11) NOT NULL,
  `Warehouse_Id` int(11) DEFAULT NULL,
  `Product_Id` int(11) DEFAULT NULL,
  `SkuProduct_Id` int(11) DEFAULT NULL,
  `Qty` decimal(18,4) DEFAULT NULL,
  PRIMARY KEY (`Inventory_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `inventory_v`
--

DROP TABLE IF EXISTS `inventory_v`;
/*!50001 DROP VIEW IF EXISTS `inventory_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `inventory_v` AS SELECT 
 1 AS `Inventory_Id`,
 1 AS `Product_id`,
 1 AS `SkuProduct_Id`,
 1 AS `BrowsePicUrl`,
 1 AS `Qty`,
 1 AS `Cost`,
 1 AS `InventoryCost`,
 1 AS `Warehouse_Id`,
 1 AS `ProdName`,
 1 AS `Unit`,
 1 AS `SkuProdCode`,
 1 AS `PV_Txt`,
 1 AS `ProdCategory_Ids`,
 1 AS `PdcIndexs`,
 1 AS `LRCode`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `lstcompany`
--

DROP TABLE IF EXISTS `lstcompany`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lstcompany` (
  `LstCompany_Id` int(11) NOT NULL,
  `Seq` int(11) NOT NULL,
  `WebAddress` varchar(255) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`LstCompany_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lstcompany`
--

LOCK TABLES `lstcompany` WRITE;
/*!40000 ALTER TABLE `lstcompany` DISABLE KEYS */;
INSERT INTO `lstcompany` VALUES (1,1,'',1);
/*!40000 ALTER TABLE `lstcompany` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lstcompany_res`
--

DROP TABLE IF EXISTS `lstcompany_res`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lstcompany_res` (
  `LstCompany_Res_Id` int(11) NOT NULL,
  `LstCompany_Id` int(11) DEFAULT NULL,
  `LstCompanyName` varchar(50) DEFAULT NULL,
  `LRCode` varchar(10) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`LstCompany_Res_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lstcompany_res`
--

LOCK TABLES `lstcompany_res` WRITE;
/*!40000 ALTER TABLE `lstcompany_res` DISABLE KEYS */;
INSERT INTO `lstcompany_res` VALUES (1,1,'物流公司A','zh-cn',1),(2,1,'物流公司A','en-us',1);
/*!40000 ALTER TABLE `lstcompany_res` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lstsolution`
--

DROP TABLE IF EXISTS `lstsolution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lstsolution` (
  `LstSolution_Id` int(11) NOT NULL,
  `Seq` int(11) DEFAULT NULL,
  `LstCompany_Id` int(11) DEFAULT NULL,
  `SysWeightUnit_Id` int(11) DEFAULT NULL,
  `SysCurrency_Id` int(11) DEFAULT NULL,
  `CalculateModel` int(11) DEFAULT NULL,
  `LstSolutionType` int(11) DEFAULT NULL,
  `TrackWebAddress` varchar(255) DEFAULT NULL,
  `VolumnForCal` int(11) DEFAULT NULL,
  `VATLimit` decimal(18,2) DEFAULT NULL,
  `VATValue` decimal(18,2) DEFAULT NULL,
  `VAT_SysCurrency_Id` int(11) DEFAULT NULL,
  `SalePlatform_Ids` varchar(255) DEFAULT NULL,
  `Warehouse_Ids` varchar(255) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`LstSolution_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lstsolution`
--

LOCK TABLES `lstsolution` WRITE;
/*!40000 ALTER TABLE `lstsolution` DISABLE KEYS */;
INSERT INTO `lstsolution` VALUES (1,1,1,1,1,1,1,'xxx',0,0.00,0.00,1,NULL,'#1#',1);
/*!40000 ALTER TABLE `lstsolution` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lstsolution_area_rel`
--

DROP TABLE IF EXISTS `lstsolution_area_rel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lstsolution_area_rel` (
  `LstSolution_Area_Rel_Id` int(11) NOT NULL,
  `LstSolutionItem_Id` int(11) DEFAULT NULL,
  `LstSolution_Id` int(11) DEFAULT NULL,
  `GlobalArea_Id` int(11) DEFAULT NULL,
  PRIMARY KEY (`LstSolution_Area_Rel_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lstsolution_area_rel`
--

LOCK TABLES `lstsolution_area_rel` WRITE;
/*!40000 ALTER TABLE `lstsolution_area_rel` DISABLE KEYS */;
INSERT INTO `lstsolution_area_rel` VALUES (1,1,1,135),(2,1,1,89),(3,1,1,104),(4,1,1,122),(5,1,1,21),(6,1,1,98),(7,1,1,14),(8,1,1,56),(9,1,1,150),(10,1,1,6),(11,1,1,123),(12,1,1,49),(13,1,1,36),(14,1,1,7),(15,1,1,166),(16,1,1,169),(17,1,1,73),(18,1,1,66),(19,1,1,57),(20,1,1,151),(21,1,1,100),(22,1,1,58),(23,1,1,102),(24,1,1,143),(25,1,1,101),(26,1,1,37),(27,1,1,130),(28,1,1,9),(29,1,1,117),(30,1,1,125),(31,1,1,59),(32,1,1,62),(33,1,1,153),(34,1,1,60),(35,1,1,72),(36,1,1,316),(37,1,1,61),(38,1,1,86),(39,1,1,124),(40,1,1,103),(41,1,1,154),(42,1,1,11),(43,1,1,155),(44,1,1,156),(45,1,1,25),(46,1,1,167),(47,1,1,65),(48,1,1,69),(49,1,1,46),(50,1,1,199),(51,1,1,108),(52,1,1,107),(53,1,1,128),(54,1,1,168),(55,1,1,68),(56,1,1,99),(57,1,1,38),(58,1,1,136),(59,1,1,67),(60,1,1,158),(61,1,1,171),(62,1,1,163),(63,1,1,162),(64,1,1,127),(65,1,1,105),(66,1,1,110),(67,1,1,16),(68,1,1,106),(69,1,1,129),(70,1,1,24),(71,1,1,112),(72,1,1,26),(73,1,1,84),(74,1,1,83),(75,1,1,113),(76,1,1,137),(77,1,1,165),(78,1,1,28),(79,1,1,173),(80,1,1,174),(81,1,1,172),(82,1,1,170),(83,1,1,13),(84,1,1,64),(85,1,1,203),(86,1,1,157),(87,1,1,39),(88,1,1,161),(89,1,1,27),(90,1,1,63),(91,1,1,175),(92,1,1,75),(93,1,1,176),(94,1,1,29),(95,1,1,30),(96,1,1,77),(97,1,1,177),(98,1,1,178),(99,1,1,76),(100,1,1,78),(101,1,1,189),(102,1,1,88),(103,1,1,179),(104,1,1,32),(105,1,1,80),(106,1,1,180),(107,1,1,31),(108,1,1,181),(109,1,1,79),(110,1,1,138),(111,1,1,183),(112,1,1,182),(113,1,1,33),(114,1,1,10),(115,1,1,131),(116,1,1,139),(117,1,1,34),(118,1,1,81),(119,1,1,184),(120,1,1,82),(121,1,1,185),(122,1,1,115),(123,1,1,186),(124,1,1,195),(125,1,1,140),(126,1,1,35),(127,1,1,116),(128,1,1,187),(129,1,1,188),(130,1,1,85),(131,1,1,87),(132,1,1,22),(133,1,1,95),(134,1,1,96),(135,1,1,109),(136,1,1,144),(137,1,1,91),(138,1,1,193),(139,1,1,191),(140,1,1,317),(141,1,1,192),(142,1,1,40),(143,1,1,119),(144,1,1,90),(145,1,1,42),(146,1,1,92),(147,1,1,93),(148,1,1,197),(149,1,1,196),(150,1,1,132),(151,1,1,194),(152,1,1,44),(153,1,1,45),(154,1,1,198),(155,1,1,146),(156,1,1,121),(157,1,1,200),(158,1,1,147),(159,1,1,47),(160,1,1,48),(161,1,1,148),(162,1,1,111),(163,1,1,134),(164,1,1,12),(165,1,1,201),(166,1,1,97),(167,1,1,133),(168,1,1,50),(169,1,1,94),(170,1,1,70),(171,1,1,41),(172,1,1,141),(173,1,1,71),(174,1,1,43),(175,1,1,114),(176,1,1,8),(177,1,1,52),(178,1,1,20),(179,1,1,19),(180,1,1,74),(181,1,1,17),(182,1,1,18),(183,1,1,23),(184,1,1,51),(185,1,1,202),(186,1,1,160),(187,1,1,126),(188,1,1,159),(189,1,1,54),(190,1,1,55),(191,1,1,53);
/*!40000 ALTER TABLE `lstsolution_area_rel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lstsolution_res`
--

DROP TABLE IF EXISTS `lstsolution_res`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lstsolution_res` (
  `LstSolution_Res_Id` int(11) NOT NULL,
  `LstSolution_Id` int(11) DEFAULT NULL,
  `LstSolutionName` varchar(50) DEFAULT NULL,
  `LRCode` varchar(10) DEFAULT NULL,
  `LstSoluRemark` text,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`LstSolution_Res_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lstsolution_res`
--

LOCK TABLES `lstsolution_res` WRITE;
/*!40000 ALTER TABLE `lstsolution_res` DISABLE KEYS */;
INSERT INTO `lstsolution_res` VALUES (1,1,'物流方案A','zh-cn','',1),(2,1,'物流方案A','en-us','',1);
/*!40000 ALTER TABLE `lstsolution_res` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `lstsolution_v`
--

DROP TABLE IF EXISTS `lstsolution_v`;
/*!50001 DROP VIEW IF EXISTS `lstsolution_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `lstsolution_v` AS SELECT 
 1 AS `LstSolution_Id`,
 1 AS `Seq`,
 1 AS `LstCompany_Id`,
 1 AS `SysWeightUnit_Id`,
 1 AS `SysCurrency_Id`,
 1 AS `CalculateModel`,
 1 AS `LstSolutionType`,
 1 AS `TrackWebAddress`,
 1 AS `VolumnForCal`,
 1 AS `VATLimit`,
 1 AS `VATValue`,
 1 AS `VAT_SysCurrency_Id`,
 1 AS `SalePlatform_Ids`,
 1 AS `Warehouse_Ids`,
 1 AS `EnableFlag`,
 1 AS `LstSolutionName`,
 1 AS `LstCompanyName`,
 1 AS `LstCompanySeq`,
 1 AS `LRCode`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `lstsolutionitem`
--

DROP TABLE IF EXISTS `lstsolutionitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lstsolutionitem` (
  `LstSolutionItem_Id` int(11) NOT NULL,
  `LstSolution_Id` int(11) DEFAULT NULL,
  `LstSolutionItemName` varchar(50) DEFAULT NULL,
  `LstAreaIds` text,
  `MinAvaiTime` int(11) DEFAULT NULL,
  `MaxAvaiTime` int(11) DEFAULT NULL,
  `StartWeight` decimal(18,4) DEFAULT NULL,
  `WeightLimit` decimal(18,4) DEFAULT NULL,
  PRIMARY KEY (`LstSolutionItem_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lstsolutionitem`
--

LOCK TABLES `lstsolutionitem` WRITE;
/*!40000 ALTER TABLE `lstsolutionitem` DISABLE KEYS */;
INSERT INTO `lstsolutionitem` VALUES (1,1,'','',10,30,0.0000,5.0000);
/*!40000 ALTER TABLE `lstsolutionitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lstsolutionitem_charge`
--

DROP TABLE IF EXISTS `lstsolutionitem_charge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lstsolutionitem_charge` (
  `LstSolutionItem_Charge_Id` int(11) NOT NULL,
  `LstSolution_Id` int(11) DEFAULT NULL,
  `LstSolutionItem_Id` int(11) DEFAULT NULL,
  `StartWeight` decimal(18,4) DEFAULT NULL,
  `WeightLimit` decimal(18,4) DEFAULT NULL,
  `IncreaseWeight` decimal(18,4) DEFAULT NULL,
  `IncreaseWeightCharge` decimal(18,4) DEFAULT NULL,
  `OtherItemCharge` decimal(18,2) DEFAULT NULL,
  PRIMARY KEY (`LstSolutionItem_Charge_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lstsolutionitem_charge`
--

LOCK TABLES `lstsolutionitem_charge` WRITE;
/*!40000 ALTER TABLE `lstsolutionitem_charge` DISABLE KEYS */;
INSERT INTO `lstsolutionitem_charge` VALUES (1,1,1,0.0000,5.0000,0.0010,0.1000,8.00);
/*!40000 ALTER TABLE `lstsolutionitem_charge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `lstsolutionrel_v`
--

DROP TABLE IF EXISTS `lstsolutionrel_v`;
/*!50001 DROP VIEW IF EXISTS `lstsolutionrel_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `lstsolutionrel_v` AS SELECT 
 1 AS `LstSolution_Id`,
 1 AS `Seq`,
 1 AS `LstCompany_Id`,
 1 AS `SysWeightUnit_Id`,
 1 AS `SysCurrency_Id`,
 1 AS `CalculateModel`,
 1 AS `LstSolutionType`,
 1 AS `TrackWebAddress`,
 1 AS `VolumnForCal`,
 1 AS `VATLimit`,
 1 AS `VATValue`,
 1 AS `VAT_SysCurrency_Id`,
 1 AS `SalePlatform_Ids`,
 1 AS `Warehouse_Ids`,
 1 AS `EnableFlag`,
 1 AS `LstSolutionItem_Id`,
 1 AS `LstAreaIds`,
 1 AS `MinAvaiTime`,
 1 AS `MaxAvaiTime`,
 1 AS `StartWeight`,
 1 AS `WeightLimit`,
 1 AS `GlobalArea_Id`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `marketingcost`
--

DROP TABLE IF EXISTS `marketingcost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `marketingcost` (
  `MarketingCost_Id` int(11) NOT NULL,
  `SS_Product_Id` int(11) DEFAULT NULL,
  `MkName` varchar(50) DEFAULT NULL,
  `GlobalArea_Id` int(11) DEFAULT NULL,
  `SalePlatform_Id` int(11) DEFAULT NULL,
  `SaleSite_Id` int(11) DEFAULT NULL,
  `MkCost` decimal(18,2) DEFAULT NULL,
  `Remark` text,
  `OperaTime` date DEFAULT NULL,
  PRIMARY KEY (`MarketingCost_Id`),
  KEY `SS_Product_Id` (`SS_Product_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marketingcost`
--

LOCK TABLES `marketingcost` WRITE;
/*!40000 ALTER TABLE `marketingcost` DISABLE KEYS */;
/*!40000 ALTER TABLE `marketingcost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mkcusttask`
--

DROP TABLE IF EXISTS `mkcusttask`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mkcusttask` (
  `MKCustTask_Id` int(11) NOT NULL,
  `Customer_Id` int(11) DEFAULT NULL,
  `TaskType` int(11) DEFAULT NULL,
  `JScriptFile` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`MKCustTask_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mkcusttask`
--

LOCK TABLES `mkcusttask` WRITE;
/*!40000 ALTER TABLE `mkcusttask` DISABLE KEYS */;
/*!40000 ALTER TABLE `mkcusttask` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pdcproperty`
--

DROP TABLE IF EXISTS `pdcproperty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pdcproperty` (
  `PdcProperty_Id` int(11) NOT NULL,
  `ProdCategory_Id` int(11) DEFAULT NULL,
  `SS_ProdCategory_Id` int(11) DEFAULT NULL,
  `ProdProperty_Id` int(11) DEFAULT NULL,
  `IsKeyAttribute` int(11) DEFAULT NULL,
  `IsSku` int(11) DEFAULT NULL,
  `Seq` int(11) DEFAULT NULL,
  PRIMARY KEY (`PdcProperty_Id`),
  KEY `ProdProperty_Id` (`ProdProperty_Id`),
  KEY `SS_ProdCategory_Id` (`SS_ProdCategory_Id`),
  KEY `ProdCategory_Id` (`ProdCategory_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pdcproperty`
--

LOCK TABLES `pdcproperty` WRITE;
/*!40000 ALTER TABLE `pdcproperty` DISABLE KEYS */;
/*!40000 ALTER TABLE `pdcproperty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `po_finance_v`
--

DROP TABLE IF EXISTS `po_finance_v`;
/*!50001 DROP VIEW IF EXISTS `po_finance_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `po_finance_v` AS SELECT 
 1 AS `PurchaseOrder_Id`,
 1 AS `BillType`,
 1 AS `Done`,
 1 AS `Remaining`,
 1 AS `PRFund`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `po_financerecord_v`
--

DROP TABLE IF EXISTS `po_financerecord_v`;
/*!50001 DROP VIEW IF EXISTS `po_financerecord_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `po_financerecord_v` AS SELECT 
 1 AS `FBType`,
 1 AS `FType`,
 1 AS `FRId`,
 1 AS `FCode`,
 1 AS `OperateTime`,
 1 AS `FTotalMoney`,
 1 AS `FFinishedMoney`,
 1 AS `FreezePRFund`,
 1 AS `State`,
 1 AS `PurchaseOrder_Id`,
 1 AS `SysCurrency_Id`,
 1 AS `CostSubjectName`,
 1 AS `LRCode`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `po_product`
--

DROP TABLE IF EXISTS `po_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `po_product` (
  `PO_Product_Id` int(11) NOT NULL,
  `PurchaseOrder_Id` int(11) DEFAULT NULL,
  `Product_Id` int(11) DEFAULT NULL,
  `SkuProduct_Id` int(11) DEFAULT NULL,
  `Qty` decimal(18,2) DEFAULT NULL,
  `QuotedPrice` decimal(18,2) DEFAULT NULL,
  `Price` decimal(18,2) DEFAULT NULL,
  `ReceiveRetQty` decimal(18,2) DEFAULT NULL,
  PRIMARY KEY (`PO_Product_Id`),
  KEY `SkuProduct_Id` (`SkuProduct_Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `po_product`
--

LOCK TABLES `po_product` WRITE;
/*!40000 ALTER TABLE `po_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `po_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `po_product_running_v`
--

DROP TABLE IF EXISTS `po_product_running_v`;
/*!50001 DROP VIEW IF EXISTS `po_product_running_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `po_product_running_v` AS SELECT 
 1 AS `SkuProduct_Id`,
 1 AS `Qty`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `pr_eoproduct_v`
--

DROP TABLE IF EXISTS `pr_eoproduct_v`;
/*!50001 DROP VIEW IF EXISTS `pr_eoproduct_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `pr_eoproduct_v` AS SELECT 
 1 AS `Product_Id`,
 1 AS `SkuProduct_Id`,
 1 AS `Qty`,
 1 AS `MinEstimatedShipTime`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `previewfundflowrecord`
--

DROP TABLE IF EXISTS `previewfundflowrecord`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `previewfundflowrecord` (
  `PreviewFundFlowRecord_Id` int(11) NOT NULL,
  `AccountOutRecord_Id` int(11) DEFAULT NULL,
  `AccountInRecord_Id` int(11) DEFAULT NULL,
  `FFRCode` varchar(10) DEFAULT NULL,
  `FlowFund` decimal(18,2) DEFAULT NULL,
  `LosedFund` decimal(18,2) DEFAULT NULL,
  `FundAccount_Id` int(11) DEFAULT NULL,
  `SysCurrency_Id` int(11) DEFAULT NULL,
  `Rate` decimal(18,4) DEFAULT NULL,
  `PRFund` decimal(18,2) DEFAULT NULL,
  `OperateTime` datetime DEFAULT NULL,
  `OperateBy` int(11) DEFAULT NULL,
  `AccountYear` int(11) DEFAULT NULL,
  `AccountMonth` int(11) DEFAULT NULL,
  `FromSource` varchar(50) DEFAULT NULL,
  `SIKey` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`PreviewFundFlowRecord_Id`),
  KEY `AccountInRecord_Id` (`AccountInRecord_Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `previewfundflowrecord`
--

LOCK TABLES `previewfundflowrecord` WRITE;
/*!40000 ALTER TABLE `previewfundflowrecord` DISABLE KEYS */;
/*!40000 ALTER TABLE `previewfundflowrecord` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `previewfundflowrecord_v`
--

DROP TABLE IF EXISTS `previewfundflowrecord_v`;
/*!50001 DROP VIEW IF EXISTS `previewfundflowrecord_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `previewfundflowrecord_v` AS SELECT 
 1 AS `PreviewFundFlowRecord_Id`,
 1 AS `AccountOutRecord_Id`,
 1 AS `AccountInRecord_Id`,
 1 AS `FFRCode`,
 1 AS `FlowFund`,
 1 AS `LosedFund`,
 1 AS `FundAccount_Id`,
 1 AS `SysCurrency_Id`,
 1 AS `Rate`,
 1 AS `PRFund`,
 1 AS `OperateTime`,
 1 AS `OperateBy`,
 1 AS `AccountYear`,
 1 AS `AccountMonth`,
 1 AS `FromSource`,
 1 AS `SIKey`,
 1 AS `FundAccount`,
 1 AS `CurrSymbol`,
 1 AS `ObjCode`,
 1 AS `FullName`,
 1 AS `AORCurrSymbol`,
 1 AS `CurrName`,
 1 AS `AORCurrName`,
 1 AS `FundLRCode`,
 1 AS `OjbLRCode`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `prodcategory`
--

DROP TABLE IF EXISTS `prodcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prodcategory` (
  `ProdCategory_Id` int(11) NOT NULL,
  `ParentPdc_Id` int(11) DEFAULT NULL,
  `Seq` int(11) DEFAULT NULL,
  `Layer` int(11) DEFAULT NULL,
  `PdcIndexs` varchar(255) DEFAULT NULL,
  `BrowserPicWidth` int(11) DEFAULT NULL,
  `BrowserPicHeight` int(11) DEFAULT NULL,
  `PdcCode` varchar(5) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  `ProdCount` int(11) DEFAULT NULL,
  PRIMARY KEY (`ProdCategory_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prodcategory`
--

LOCK TABLES `prodcategory` WRITE;
/*!40000 ALTER TABLE `prodcategory` DISABLE KEYS */;
INSERT INTO `prodcategory` VALUES (1,0,1,0,'',150,150,'',1,1);
/*!40000 ALTER TABLE `prodcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prodcategory_res`
--

DROP TABLE IF EXISTS `prodcategory_res`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prodcategory_res` (
  `ProdCategory_Res_Id` int(11) NOT NULL,
  `ProdCategory_Id` int(11) DEFAULT NULL,
  `LRCode` varchar(10) DEFAULT NULL,
  `PdcName` varchar(50) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`ProdCategory_Res_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prodcategory_res`
--

LOCK TABLES `prodcategory_res` WRITE;
/*!40000 ALTER TABLE `prodcategory_res` DISABLE KEYS */;
INSERT INTO `prodcategory_res` VALUES (1,1,'zh-cn','汽车轮毂',1),(2,1,'en-us','汽车轮毂',1);
/*!40000 ALTER TABLE `prodcategory_res` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prodcodecount`
--

DROP TABLE IF EXISTS `prodcodecount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prodcodecount` (
  `ProdCode_Id` int(11) NOT NULL,
  `MaxCount` int(11) DEFAULT NULL,
  PRIMARY KEY (`ProdCode_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prodcodecount`
--

LOCK TABLES `prodcodecount` WRITE;
/*!40000 ALTER TABLE `prodcodecount` DISABLE KEYS */;
INSERT INTO `prodcodecount` VALUES (1,1);
/*!40000 ALTER TABLE `prodcodecount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `prodinventory_v`
--

DROP TABLE IF EXISTS `prodinventory_v`;
/*!50001 DROP VIEW IF EXISTS `prodinventory_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `prodinventory_v` AS SELECT 
 1 AS `Product_Id`,
 1 AS `ProdCode`,
 1 AS `Brand_Id`,
 1 AS `PropValues`,
 1 AS `ProdName`,
 1 AS `Unit`,
 1 AS `PdcSeq`,
 1 AS `Seq`,
 1 AS `Qty`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `prodproperty`
--

DROP TABLE IF EXISTS `prodproperty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prodproperty` (
  `ProdProperty_Id` int(11) NOT NULL,
  `PValueIdRange` text,
  `EnableFlag` int(11) DEFAULT NULL,
  `SMT_ProdProperty_Id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ProdProperty_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prodproperty`
--

LOCK TABLES `prodproperty` WRITE;
/*!40000 ALTER TABLE `prodproperty` DISABLE KEYS */;
/*!40000 ALTER TABLE `prodproperty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prodproperty_res`
--

DROP TABLE IF EXISTS `prodproperty_res`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prodproperty_res` (
  `ProdProperty_Res_Id` int(11) NOT NULL,
  `ProdProperty_Id` int(11) DEFAULT NULL,
  `LRCode` varchar(10) DEFAULT NULL,
  `ProdPropName` varchar(50) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`ProdProperty_Res_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prodproperty_res`
--

LOCK TABLES `prodproperty_res` WRITE;
/*!40000 ALTER TABLE `prodproperty_res` DISABLE KEYS */;
/*!40000 ALTER TABLE `prodproperty_res` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `Product_Id` int(11) NOT NULL,
  `Brand_Id` int(11) DEFAULT NULL,
  `Weight` decimal(18,4) DEFAULT NULL,
  `SKUProps` varchar(255) DEFAULT NULL,
  `ExpandProps` varchar(255) DEFAULT NULL,
  `ProdProperty_Ids` varchar(255) DEFAULT NULL,
  `PropValues` varchar(255) DEFAULT NULL,
  `PicFile` varchar(255) DEFAULT NULL,
  `ProdCode` varchar(50) DEFAULT NULL,
  `SkuProdCount` int(11) DEFAULT NULL,
  `MinCost` decimal(18,2) DEFAULT NULL,
  `MaxCost` decimal(18,2) DEFAULT NULL,
  `Length` decimal(18,2) DEFAULT NULL,
  `Width` decimal(18,2) DEFAULT NULL,
  `Height` decimal(18,2) DEFAULT NULL,
  `CustomProdName` varchar(30) DEFAULT NULL,
  `CustomProdName_CN` varchar(30) DEFAULT NULL,
  `CustomValue` decimal(18,2) DEFAULT NULL,
  `CustomCode` varchar(30) DEFAULT NULL,
  `GlobalArea_Id` int(11) DEFAULT NULL,
  `CustomMaterial` varchar(255) DEFAULT NULL,
  `TotalStock` decimal(18,2) DEFAULT NULL,
  `State` int(11) DEFAULT NULL,
  `ProdCategory_Id` int(11) DEFAULT NULL,
  `Seq` int(11) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  `Operator` int(11) DEFAULT NULL,
  PRIMARY KEY (`Product_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,0,1.0000,'','','','',NULL,'G00000001',1,200.00,200.00,NULL,NULL,NULL,'','',0.00,'',0,'',NULL,2,1,1,1,1);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `product_pdc_v`
--

DROP TABLE IF EXISTS `product_pdc_v`;
/*!50001 DROP VIEW IF EXISTS `product_pdc_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `product_pdc_v` AS SELECT 
 1 AS `ProdKey`,
 1 AS `Product_Id`,
 1 AS `Brand_Id`,
 1 AS `Weight`,
 1 AS `SKUProps`,
 1 AS `ExpandProps`,
 1 AS `ProdProperty_Ids`,
 1 AS `PropValues`,
 1 AS `ProdCode`,
 1 AS `SkuProdCount`,
 1 AS `MinCost`,
 1 AS `MaxCost`,
 1 AS `State`,
 1 AS `Length`,
 1 AS `Width`,
 1 AS `Height`,
 1 AS `PicFile`,
 1 AS `CustomProdName`,
 1 AS `CustomProdName_CN`,
 1 AS `CustomMaterial`,
 1 AS `CustomValue`,
 1 AS `CustomCode`,
 1 AS `GlobalArea_Id`,
 1 AS `ProdName`,
 1 AS `Unit`,
 1 AS `LRCode`,
 1 AS `Product_Seq_Id`,
 1 AS `Seq`,
 1 AS `ProdCategory_Id`,
 1 AS `PdcIndexs`,
 1 AS `EnableFlag`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `product_pic`
--

DROP TABLE IF EXISTS `product_pic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_pic` (
  `Product_Pic_Id` int(11) NOT NULL,
  `Product_Id` int(11) DEFAULT NULL,
  `SS_Product_Id` int(11) DEFAULT NULL,
  `Seq` int(11) DEFAULT NULL,
  `PicUrl` varchar(255) DEFAULT NULL,
  `BrowsePicUrl` varchar(255) DEFAULT NULL,
  `SourcePicUrl` varchar(255) DEFAULT NULL,
  `IsMain` int(11) DEFAULT NULL,
  `RelPValueIds` varchar(255) DEFAULT NULL,
  `_PictureUrl` varchar(255) DEFAULT NULL,
  `IsDetailPic` int(11) DEFAULT NULL,
  `DetailTag` varchar(50) DEFAULT NULL,
  `SMT_PictureUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Product_Pic_Id`),
  KEY `SS_Product_Id` (`SS_Product_Id`),
  KEY `Product_Id` (`Product_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_pic`
--

LOCK TABLES `product_pic` WRITE;
/*!40000 ALTER TABLE `product_pic` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_pic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `product_rel_v`
--

DROP TABLE IF EXISTS `product_rel_v`;
/*!50001 DROP VIEW IF EXISTS `product_rel_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `product_rel_v` AS SELECT 
 1 AS `Product_Id`,
 1 AS `State`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `product_res`
--

DROP TABLE IF EXISTS `product_res`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_res` (
  `Product_Res_Id` int(11) NOT NULL,
  `Product_Id` int(11) DEFAULT NULL,
  `LRCode` varchar(10) DEFAULT NULL,
  `ProdName` varchar(100) DEFAULT NULL,
  `Unit` varchar(10) DEFAULT NULL,
  `Remark` longtext,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`Product_Res_Id`),
  KEY `Product_Id` (`Product_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_res`
--

LOCK TABLES `product_res` WRITE;
/*!40000 ALTER TABLE `product_res` DISABLE KEYS */;
INSERT INTO `product_res` VALUES (1,1,'zh-cn','汽车轮毂-A','件','',1),(2,1,'en-us','汽车轮毂-A','件','',1);
/*!40000 ALTER TABLE `product_res` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_seq`
--

DROP TABLE IF EXISTS `product_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_seq` (
  `Product_Seq_Id` int(11) NOT NULL,
  `Product_Id` int(11) DEFAULT NULL,
  `ProdCategory_Id` int(11) DEFAULT NULL,
  `Seq` int(11) DEFAULT NULL,
  PRIMARY KEY (`Product_Seq_Id`),
  KEY `Product_Id` (`Product_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_seq`
--

LOCK TABLES `product_seq` WRITE;
/*!40000 ALTER TABLE `product_seq` DISABLE KEYS */;
INSERT INTO `product_seq` VALUES (1,1,1,1);
/*!40000 ALTER TABLE `product_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `product_v`
--

DROP TABLE IF EXISTS `product_v`;
/*!50001 DROP VIEW IF EXISTS `product_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `product_v` AS SELECT 
 1 AS `Product_Id`,
 1 AS `Brand_Id`,
 1 AS `Weight`,
 1 AS `SKUProps`,
 1 AS `ExpandProps`,
 1 AS `ProdProperty_Ids`,
 1 AS `PropValues`,
 1 AS `ProdCode`,
 1 AS `SkuProdCount`,
 1 AS `MinCost`,
 1 AS `MaxCost`,
 1 AS `State`,
 1 AS `Length`,
 1 AS `Width`,
 1 AS `Height`,
 1 AS `PicFile`,
 1 AS `CustomProdName`,
 1 AS `CustomProdName_CN`,
 1 AS `CustomMaterial`,
 1 AS `CustomValue`,
 1 AS `CustomCode`,
 1 AS `GlobalArea_Id`,
 1 AS `Operator`,
 1 AS `ProdName`,
 1 AS `Unit`,
 1 AS `LRCode`,
 1 AS `ProdCategory_Id`,
 1 AS `PdcIndexs`,
 1 AS `EnableFlag`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `propvalue`
--

DROP TABLE IF EXISTS `propvalue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `propvalue` (
  `PropValue_Id` int(11) NOT NULL,
  `ProdProperty_Id` int(11) DEFAULT NULL,
  `Seq` int(11) DEFAULT NULL,
  `PicUrl` varchar(255) DEFAULT NULL,
  `PValueCode` varchar(50) DEFAULT NULL,
  `Product_Id` int(11) DEFAULT NULL,
  `SS_Product_Id` int(11) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  `SMT_PropValue_Id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`PropValue_Id`),
  KEY `ProdProperty_Id` (`ProdProperty_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `propvalue`
--

LOCK TABLES `propvalue` WRITE;
/*!40000 ALTER TABLE `propvalue` DISABLE KEYS */;
/*!40000 ALTER TABLE `propvalue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `propvalue_res`
--

DROP TABLE IF EXISTS `propvalue_res`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `propvalue_res` (
  `PropValue_Res_Id` int(11) NOT NULL,
  `PropValue_Id` int(11) DEFAULT NULL,
  `LRCode` varchar(10) DEFAULT NULL,
  `PValue` varchar(100) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`PropValue_Res_Id`),
  KEY `PropValue_Id` (`PropValue_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `propvalue_res`
--

LOCK TABLES `propvalue_res` WRITE;
/*!40000 ALTER TABLE `propvalue_res` DISABLE KEYS */;
/*!40000 ALTER TABLE `propvalue_res` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchaseorder`
--

DROP TABLE IF EXISTS `purchaseorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchaseorder` (
  `PurchaseOrder_Id` int(11) NOT NULL,
  `POCode` varchar(50) DEFAULT NULL,
  `Supplier_Id` int(11) DEFAULT NULL,
  `Warehouse_Id` int(11) DEFAULT NULL,
  `OtherCharge` decimal(18,2) DEFAULT NULL,
  `TotalPrice` decimal(18,2) DEFAULT NULL,
  `CreateTime` date DEFAULT NULL,
  `CreateBy` int(11) DEFAULT NULL,
  `LastUpdatedTime` date DEFAULT NULL,
  `LastUpdatedUser` int(11) DEFAULT NULL,
  `EstimateArriveTime` date DEFAULT NULL,
  `Remark` varchar(255) DEFAULT NULL,
  `RevType` int(11) DEFAULT NULL,
  `RevRemark` varchar(255) DEFAULT NULL,
  `State` int(11) DEFAULT NULL,
  PRIMARY KEY (`PurchaseOrder_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchaseorder`
--

LOCK TABLES `purchaseorder` WRITE;
/*!40000 ALTER TABLE `purchaseorder` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchaseorder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `purchaseorder_v`
--

DROP TABLE IF EXISTS `purchaseorder_v`;
/*!50001 DROP VIEW IF EXISTS `purchaseorder_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `purchaseorder_v` AS SELECT 
 1 AS `PurchaseOrder_Id`,
 1 AS `POCode`,
 1 AS `Supplier_Id`,
 1 AS `Warehouse_Id`,
 1 AS `OtherCharge`,
 1 AS `TotalPrice`,
 1 AS `CreateTime`,
 1 AS `CreateBy`,
 1 AS `LastUpdatedTime`,
 1 AS `LastUpdatedUser`,
 1 AS `EstimateArriveTime`,
 1 AS `Remark`,
 1 AS `RevType`,
 1 AS `RevRemark`,
 1 AS `State`,
 1 AS `SuppName`,
 1 AS `LRCode`,
 1 AS `FullName`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `purchaseprice`
--

DROP TABLE IF EXISTS `purchaseprice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchaseprice` (
  `PurchasePrice_Id` int(11) NOT NULL,
  `Product_Id` int(11) DEFAULT NULL,
  `SkuProduct_Id` int(11) DEFAULT NULL,
  `Supplier_Id` int(11) DEFAULT NULL,
  `PurAddress` varchar(255) DEFAULT NULL,
  `QuotedPrice` decimal(18,2) DEFAULT NULL,
  `Period` int(11) DEFAULT NULL,
  `Remark` text,
  `GlobalArea_Id` int(11) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`PurchasePrice_Id`),
  KEY `SkuProduct_Id` (`SkuProduct_Id`),
  KEY `Supplier_Id` (`Supplier_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchaseprice`
--

LOCK TABLES `purchaseprice` WRITE;
/*!40000 ALTER TABLE `purchaseprice` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchaseprice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchaseproduct`
--

DROP TABLE IF EXISTS `purchaseproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchaseproduct` (
  `PurchaseProduct_Id` int(11) NOT NULL,
  `Product_Id` int(11) DEFAULT NULL,
  `SkuProduct_Id` int(11) DEFAULT NULL,
  `Qty` decimal(18,2) DEFAULT NULL,
  `LastUpdatedTime` date DEFAULT NULL,
  PRIMARY KEY (`PurchaseProduct_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchaseproduct`
--

LOCK TABLES `purchaseproduct` WRITE;
/*!40000 ALTER TABLE `purchaseproduct` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchaseproduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `purchaseproduct_v`
--

DROP TABLE IF EXISTS `purchaseproduct_v`;
/*!50001 DROP VIEW IF EXISTS `purchaseproduct_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `purchaseproduct_v` AS SELECT 
 1 AS `SkuProduct_Id`,
 1 AS `Product_Id`,
 1 AS `SkuProdCode`,
 1 AS `ProdName`,
 1 AS `Unit`,
 1 AS `PV_Txt`,
 1 AS `Cost`,
 1 AS `LastUpdatedTime`,
 1 AS `BrowsePicUrl`,
 1 AS `RequestQty`,
 1 AS `RunningQty`,
 1 AS `IsRequest`,
 1 AS `LRCode`,
 1 AS `Seq`,
 1 AS `SkuSeq`,
 1 AS `PdcSeq`,
 1 AS `PdcIndexs`,
 1 AS `ProdCategory_Id`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `sale_finance_v`
--

DROP TABLE IF EXISTS `sale_finance_v`;
/*!50001 DROP VIEW IF EXISTS `sale_finance_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `sale_finance_v` AS SELECT 
 1 AS `FBType`,
 1 AS `FType`,
 1 AS `FRId`,
 1 AS `FCode`,
 1 AS `OperateTime`,
 1 AS `FTotalMoney`,
 1 AS `FFinishedMoney`,
 1 AS `FreezePRFund`,
 1 AS `State`,
 1 AS `SaleOrder_Id`,
 1 AS `SysCurrency_Id`,
 1 AS `AS_Problem_Id`,
 1 AS `ASPCode`,
 1 AS `ProblemType`,
 1 AS `CostSubjectName`,
 1 AS `LRCode`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `saleanalysisobj`
--

DROP TABLE IF EXISTS `saleanalysisobj`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `saleanalysisobj` (
  `SaleAnalysisObj_Id` int(11) NOT NULL,
  `SAOName` varchar(255) DEFAULT NULL,
  `SAOType` varchar(255) DEFAULT NULL,
  `TargetProfit` int(11) DEFAULT NULL,
  `TargetAvageSaleQty` decimal(18,2) DEFAULT NULL,
  `TargetAvageProfit` decimal(18,2) DEFAULT NULL,
  `MonitorEndTime` date DEFAULT NULL,
  `SalePlatform_Id` int(11) NOT NULL,
  `SaleSite_Id` int(11) NOT NULL,
  `Remark` text,
  `Priority` int(11) DEFAULT NULL,
  PRIMARY KEY (`SaleAnalysisObj_Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saleanalysisobj`
--

LOCK TABLES `saleanalysisobj` WRITE;
/*!40000 ALTER TABLE `saleanalysisobj` DISABLE KEYS */;
/*!40000 ALTER TABLE `saleanalysisobj` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `saleanalysisobj_v`
--

DROP TABLE IF EXISTS `saleanalysisobj_v`;
/*!50001 DROP VIEW IF EXISTS `saleanalysisobj_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `saleanalysisobj_v` AS SELECT 
 1 AS `SaleAnalysisObj_Id`,
 1 AS `SAOName`,
 1 AS `SAOType`,
 1 AS `TargetProfit`,
 1 AS `TargetAvageSaleQty`,
 1 AS `TargetAvageProfit`,
 1 AS `MonitorEndTime`,
 1 AS `SalePlatform_Id`,
 1 AS `SaleSite_Id`,
 1 AS `Remark`,
 1 AS `Priority`,
 1 AS `SS_Product_Id`,
 1 AS `BrowsePicUrl`,
 1 AS `ProdCount`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `saleorder`
--

DROP TABLE IF EXISTS `saleorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `saleorder` (
  `SaleOrder_Id` int(11) NOT NULL,
  `SOCode` varchar(50) DEFAULT NULL,
  `Customer_Id` int(11) DEFAULT NULL,
  `SalePlatform_Id` int(11) DEFAULT NULL,
  `SaleSite_Id` int(11) DEFAULT NULL,
  `SysWeightUnit_Id` int(11) DEFAULT NULL,
  `SysCurrency_Id` int(11) DEFAULT NULL,
  `SOTerm` text,
  `Remark` text,
  `CurrRate` decimal(18,2) DEFAULT NULL,
  `TotalPrice` decimal(18,2) DEFAULT NULL,
  `TotalCost` decimal(18,2) DEFAULT NULL,
  `TotalProfit` decimal(18,2) DEFAULT NULL,
  `SOState` int(11) DEFAULT NULL,
  `CreateTime` datetime DEFAULT NULL,
  `Creator` int(11) DEFAULT NULL,
  `CustConfirmer` int(11) DEFAULT NULL,
  `CustConfirmTime` datetime DEFAULT NULL,
  `SubmitHandleTime` datetime DEFAULT NULL,
  `SubmitHandler` int(11) DEFAULT NULL,
  `SubmitExpTime` datetime DEFAULT NULL,
  `SubmitExper` int(11) DEFAULT NULL,
  `LastUpdatedDate` datetime DEFAULT NULL,
  `LastUpdatedUser` int(11) DEFAULT NULL,
  `ProductJson` text,
  `IsReSend` int(11) DEFAULT NULL,
  `SaleMonth` int(11) DEFAULT NULL,
  `SaleYear` int(11) DEFAULT NULL,
  `ExpressOrder_Id` int(11) DEFAULT NULL,
  `DeliveryInSMT` int(11) DEFAULT NULL,
  `DeliveryInTaobao` int(11) DEFAULT NULL,
  `SMTState` varchar(50) DEFAULT NULL,
  `IsShipInSMT` int(11) DEFAULT NULL,
  `SMTMessageState` int(11) DEFAULT NULL,
  `CustName` varchar(255) DEFAULT NULL,
  `pic_snapshot` varchar(255) DEFAULT NULL COMMENT '订单图片地址',
  PRIMARY KEY (`SaleOrder_Id`),
  KEY `ExpressOrder_Id` (`ExpressOrder_Id`),
  KEY `Customer_Id` (`Customer_Id`),
  KEY `SOState` (`SOState`),
  KEY `SMTState` (`SMTState`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saleorder`
--

LOCK TABLES `saleorder` WRITE;
/*!40000 ALTER TABLE `saleorder` DISABLE KEYS */;
INSERT INTO `saleorder` VALUES (1,'S075084788',4,8,4,1,2,'','',1.00,100.00,57.26,42.74,10,'2016-10-23 00:00:00',1,1,'2016-10-23 00:00:00','2016-10-23 00:00:00',1,NULL,0,'2016-10-23 21:33:04',1,'[{\"SO_Product_Id\":1,\"SaleOrder_Id\":1,\"SS_Product_Id\":1,\"SS_InnerProd_Id\":1,\"ProdCode\":\"S000000001\",\"ProdPicUrl\":\"\",\"SkuProdCode\":\"S000000001\",\"ProdName\":\"汽车轮毂-A\",\"ProdUnit\":\"pcs\",\"SkuProps\":\"默认\",\"Qty\":1.0,\"ListPrice\":100.0,\"Discount\":1.0,\"SalePrice\":100.0,\"OtherCost\":1.0,\"TransCost\":0.1,\"SO_Gift_Id\":0,\"GiftName\":\"\",\"BoxWeight\":0.0,\"BoxLength\":0.0,\"BoxWidth\":0.0,\"BoxHeight\":0.0,\"GProducts\":[{\"SO_GProduct_Id\":1,\"SO_Product_Id\":1,\"SaleOrder_Id\":1,\"Product_Id\":1,\"SkuProduct_Id\":1,\"SkuProdCode\":\"G000000002\",\"ProdName\":\"汽车轮毂-A\",\"ProdUnit\":\"件\",\"SkuProps\":\"默认\",\"Qty\":1.0,\"Cost\":30.04,\"Weight\":1.0,\"OtherProps\":{}}],\"GiftItems\":[],\"OtherProps\":{}}]',NULL,10,2016,1,NULL,NULL,'',NULL,NULL,'xxxxx',NULL);
/*!40000 ALTER TABLE `saleorder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `saleorder_finance_v`
--

DROP TABLE IF EXISTS `saleorder_finance_v`;
/*!50001 DROP VIEW IF EXISTS `saleorder_finance_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `saleorder_finance_v` AS SELECT 
 1 AS `SaleOrder_Id`,
 1 AS `BillType`,
 1 AS `Remaining`,
 1 AS `PRFund`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `saleorder_v`
--

DROP TABLE IF EXISTS `saleorder_v`;
/*!50001 DROP VIEW IF EXISTS `saleorder_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `saleorder_v` AS SELECT 
 1 AS `SaleOrder_Id`,
 1 AS `SOCode`,
 1 AS `Customer_Id`,
 1 AS `CustName`,
 1 AS `SalePlatform_Id`,
 1 AS `SaleSite_Id`,
 1 AS `SysWeightUnit_Id`,
 1 AS `SysCurrency_Id`,
 1 AS `CurrRate`,
 1 AS `TotalPrice`,
 1 AS `TotalCost`,
 1 AS `TotalProfit`,
 1 AS `SOState`,
 1 AS `CreateTime`,
 1 AS `Creator`,
 1 AS `CustConfirmTime`,
 1 AS `CustConfirmer`,
 1 AS `SubmitHandleTime`,
 1 AS `SubmitHandler`,
 1 AS `SubmitExpTime`,
 1 AS `SubmitExper`,
 1 AS `LastUpdatedDate`,
 1 AS `LastUpdatedUser`,
 1 AS `ProductJson`,
 1 AS `IsReSend`,
 1 AS `DeliveryInSMT`,
 1 AS `DeliveryInTaobao`,
 1 AS `SMTState`,
 1 AS `RvFullName`,
 1 AS `ExpressService_Id`,
 1 AS `ExpressServiceName`,
 1 AS `IsTrack`,
 1 AS `ExpServicePrice`,
 1 AS `GlobalArea_Id`,
 1 AS `SOEstimatedArriveTime`,
 1 AS `EOCode`,
 1 AS `EstimatedShipTime`,
 1 AS `EstimatedArriveTime`,
 1 AS `Warehouse_Id`,
 1 AS `LstSolution_Id`,
 1 AS `LstSolutionName`,
 1 AS `ShipTime`,
 1 AS `ArriveTime`,
 1 AS `TrackingNumber`,
 1 AS `EOState`,
 1 AS `ExpressOrder_Id`,
 1 AS `IsCombin`,
 1 AS `SORemark`,
 1 AS `pic_snapshot`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `saleorderwitheo_v`
--

DROP TABLE IF EXISTS `saleorderwitheo_v`;
/*!50001 DROP VIEW IF EXISTS `saleorderwitheo_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `saleorderwitheo_v` AS SELECT 
 1 AS `SaleOrder_Id`,
 1 AS `SOCode`,
 1 AS `Customer_Id`,
 1 AS `CustName`,
 1 AS `SalePlatform_Id`,
 1 AS `SaleSite_Id`,
 1 AS `SysWeightUnit_Id`,
 1 AS `SysCurrency_Id`,
 1 AS `TotalPrice`,
 1 AS `TotalCost`,
 1 AS `TotalProfit`,
 1 AS `SOState`,
 1 AS `CreateTime`,
 1 AS `Creator`,
 1 AS `CustConfirmTime`,
 1 AS `CustConfirmer`,
 1 AS `SubmitHandleTime`,
 1 AS `SubmitHandler`,
 1 AS `SubmitExpTime`,
 1 AS `SubmitExper`,
 1 AS `LastUpdatedDate`,
 1 AS `LastUpdatedUser`,
 1 AS `ProductJson`,
 1 AS `IsReSend`,
 1 AS `SMTState`,
 1 AS `ExpressService_Id`,
 1 AS `ExpressServiceName`,
 1 AS `IsTrack`,
 1 AS `ExpServicePrice`,
 1 AS `EstimatedShipTime`,
 1 AS `EstimatedArriveTime`,
 1 AS `ShipTime`,
 1 AS `ArriveTime`,
 1 AS `TrackingNumber`,
 1 AS `EOState`,
 1 AS `ExpressOrder_Id`,
 1 AS `LstSolution_Id`,
 1 AS `LstSolutionName`,
 1 AS `IsCombin`,
 1 AS `RvFullName`,
 1 AS `RvTel`,
 1 AS `GlobalArea_Id`,
 1 AS `RvProvince`,
 1 AS `RvCity`,
 1 AS `RvPostCode`,
 1 AS `RvAddress_1`,
 1 AS `RvAddress_2`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `salepdcnavigation`
--

DROP TABLE IF EXISTS `salepdcnavigation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salepdcnavigation` (
  `ProdCategory_Id` int(11) NOT NULL,
  `ParentPdc_Id` int(11) DEFAULT NULL,
  `SalePlatform_Id` int(11) DEFAULT NULL,
  `SaleSite_Id` int(11) DEFAULT NULL,
  `Seq` int(11) DEFAULT NULL,
  `Layer` int(11) DEFAULT NULL,
  `PdcIndexs` varchar(255) DEFAULT NULL,
  `IsPdcMenu` int(11) DEFAULT NULL,
  `BrowserPicWidth` int(11) DEFAULT NULL,
  `BrowserPicHeight` int(11) DEFAULT NULL,
  `ProdCount` int(11) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  `SMT_ProdCategory_Id` varchar(50) DEFAULT NULL,
  `SMT_Group_Id` varchar(50) DEFAULT NULL,
  `SMTPropery` int(11) DEFAULT NULL,
  PRIMARY KEY (`ProdCategory_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salepdcnavigation`
--

LOCK TABLES `salepdcnavigation` WRITE;
/*!40000 ALTER TABLE `salepdcnavigation` DISABLE KEYS */;
INSERT INTO `salepdcnavigation` VALUES (1,0,8,4,1,0,'',1,150,150,1,1,'','',NULL);
/*!40000 ALTER TABLE `salepdcnavigation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salepdcnavigation_res`
--

DROP TABLE IF EXISTS `salepdcnavigation_res`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salepdcnavigation_res` (
  `SalePdcNavigation_Res_Id` int(11) NOT NULL,
  `ProdCategory_Id` int(11) DEFAULT NULL,
  `LRCode` varchar(10) DEFAULT NULL,
  `PdcName` varchar(50) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`SalePdcNavigation_Res_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salepdcnavigation_res`
--

LOCK TABLES `salepdcnavigation_res` WRITE;
/*!40000 ALTER TABLE `salepdcnavigation_res` DISABLE KEYS */;
INSERT INTO `salepdcnavigation_res` VALUES (1,1,'zh-cn','汽车轮毂',1),(2,1,'en-us','汽车轮毂',1);
/*!40000 ALTER TABLE `salepdcnavigation_res` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saleplatform`
--

DROP TABLE IF EXISTS `saleplatform`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `saleplatform` (
  `SalePlatform_Id` int(11) NOT NULL,
  `SPfName` varchar(50) DEFAULT NULL,
  `SysCurrency_Ids` varchar(255) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  `Seq` int(11) DEFAULT NULL,
  PRIMARY KEY (`SalePlatform_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saleplatform`
--

LOCK TABLES `saleplatform` WRITE;
/*!40000 ALTER TABLE `saleplatform` DISABLE KEYS */;
INSERT INTO `saleplatform` VALUES (8,'汽车轮毂','#1#,#2#,#3#,#4#,#5#,#6#',1,NULL);
/*!40000 ALTER TABLE `saleplatform` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salesite`
--

DROP TABLE IF EXISTS `salesite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salesite` (
  `SaleSite_Id` int(11) NOT NULL,
  `SaleSiteName` varchar(50) DEFAULT NULL,
  `SalePlatform_Id` int(11) DEFAULT NULL,
  `SysCurrency_Id` int(11) DEFAULT NULL,
  `SysLanguage_Id` int(11) DEFAULT NULL,
  `GlobalArea_Ids` text,
  `SysWeightUnit_Id` int(11) DEFAULT NULL,
  `SysPrintTemplate_Id` int(11) DEFAULT NULL,
  `SysEmailTemplate_Id` int(11) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  `Seq` int(11) DEFAULT NULL,
  `appKey` varchar(50) DEFAULT NULL,
  `appSecret` varchar(50) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `access_token` varchar(255) DEFAULT NULL,
  `redirect_uri` varchar(255) DEFAULT NULL,
  `aop_signature` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`SaleSite_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salesite`
--

LOCK TABLES `salesite` WRITE;
/*!40000 ALTER TABLE `salesite` DISABLE KEYS */;
INSERT INTO `salesite` VALUES (4,'美国站',8,2,0,'#122#',1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'日本站',8,2,0,'#22#',1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,'中国站',8,1,0,'#14#',1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `salesite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `sao_prodexpservicecoststat_v`
--

DROP TABLE IF EXISTS `sao_prodexpservicecoststat_v`;
/*!50001 DROP VIEW IF EXISTS `sao_prodexpservicecoststat_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `sao_prodexpservicecoststat_v` AS SELECT 
 1 AS `SaleOrder_Id`,
 1 AS `GlobalArea_Id`,
 1 AS `RvProvince`,
 1 AS `RvCity`,
 1 AS `SS_Product_Id`,
 1 AS `ProdExpPrice`,
 1 AS `ProdExpCost`,
 1 AS `WeightRate`,
 1 AS `SaleTime`,
 1 AS `SaleSite_Id`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `sao_prodpriceandcoststat_v`
--

DROP TABLE IF EXISTS `sao_prodpriceandcoststat_v`;
/*!50001 DROP VIEW IF EXISTS `sao_prodpriceandcoststat_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `sao_prodpriceandcoststat_v` AS SELECT 
 1 AS `SaleOrder_Id`,
 1 AS `SysCurrency_Id`,
 1 AS `GlobalArea_Id`,
 1 AS `RvProvince`,
 1 AS `RvCity`,
 1 AS `SS_Product_Id`,
 1 AS `Qty`,
 1 AS `ListPrice`,
 1 AS `SalePrice`,
 1 AS `TransCost`,
 1 AS `OtherCost`,
 1 AS `ProdCost`,
 1 AS `SaleTime`,
 1 AS `SaleSite_Id`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `sao_prodsalestat_v`
--

DROP TABLE IF EXISTS `sao_prodsalestat_v`;
/*!50001 DROP VIEW IF EXISTS `sao_prodsalestat_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `sao_prodsalestat_v` AS SELECT 
 1 AS `SaleAnalysisObj_Id`,
 1 AS `SAOName`,
 1 AS `SAOType`,
 1 AS `TargetProfit`,
 1 AS `TargetAvageSaleQty`,
 1 AS `TargetAvageProfit`,
 1 AS `MonitorEndTime`,
 1 AS `SalePlatform_Id`,
 1 AS `SaleSite_Id`,
 1 AS `Remark`,
 1 AS `Priority`,
 1 AS `SS_Product_Id`,
 1 AS `BrowsePicUrl`,
 1 AS `ProdCount`,
 1 AS `SS_Product_Ids`,
 1 AS `OnlineTIme`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `sao_product`
--

DROP TABLE IF EXISTS `sao_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sao_product` (
  `SAO_Product_Id` int(11) NOT NULL,
  `SaleAnalysisObj_Id` int(11) DEFAULT NULL,
  `SS_Product_Id` int(11) DEFAULT NULL,
  PRIMARY KEY (`SAO_Product_Id`),
  KEY `SS_Product_Id` (`SS_Product_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sao_product`
--

LOCK TABLES `sao_product` WRITE;
/*!40000 ALTER TABLE `sao_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `sao_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `sao_skuprodexpservicecoststat_v`
--

DROP TABLE IF EXISTS `sao_skuprodexpservicecoststat_v`;
/*!50001 DROP VIEW IF EXISTS `sao_skuprodexpservicecoststat_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `sao_skuprodexpservicecoststat_v` AS SELECT 
 1 AS `SaleOrder_Id`,
 1 AS `GlobalArea_Id`,
 1 AS `RvProvince`,
 1 AS `RvCity`,
 1 AS `SS_Product_Id`,
 1 AS `SS_InnerProd_Id`,
 1 AS `ProdExpPrice`,
 1 AS `ProdExpCost`,
 1 AS `WeightRate`,
 1 AS `SaleTime`,
 1 AS `SaleSite_Id`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `sao_skuprodpriceandcoststat_v`
--

DROP TABLE IF EXISTS `sao_skuprodpriceandcoststat_v`;
/*!50001 DROP VIEW IF EXISTS `sao_skuprodpriceandcoststat_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `sao_skuprodpriceandcoststat_v` AS SELECT 
 1 AS `SaleOrder_Id`,
 1 AS `GlobalArea_Id`,
 1 AS `SS_Product_Id`,
 1 AS `SS_InnerProd_Id`,
 1 AS `Qty`,
 1 AS `ListPrice`,
 1 AS `SalePrice`,
 1 AS `TransCost`,
 1 AS `OtherCost`,
 1 AS `ProdCost`,
 1 AS `SaleTime`,
 1 AS `SaleSite_Id`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `skuprodcodecount`
--

DROP TABLE IF EXISTS `skuprodcodecount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `skuprodcodecount` (
  `ProdCodeCount_Id` int(11) NOT NULL,
  `MaxCount` int(11) DEFAULT NULL,
  `MaxSSCount` int(11) DEFAULT NULL,
  PRIMARY KEY (`ProdCodeCount_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skuprodcodecount`
--

LOCK TABLES `skuprodcodecount` WRITE;
/*!40000 ALTER TABLE `skuprodcodecount` DISABLE KEYS */;
INSERT INTO `skuprodcodecount` VALUES (1,2,1);
/*!40000 ALTER TABLE `skuprodcodecount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skuproduct`
--

DROP TABLE IF EXISTS `skuproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `skuproduct` (
  `SkuProduct_Id` int(11) NOT NULL,
  `Product_Id` int(11) DEFAULT NULL,
  `Seq` int(11) DEFAULT NULL,
  `ProdCode` varchar(20) DEFAULT NULL,
  `PropValues` varchar(255) DEFAULT NULL,
  `PV_Txt` varchar(255) DEFAULT NULL,
  `Cost` decimal(18,2) DEFAULT NULL,
  `InventoryCost` decimal(18,2) DEFAULT NULL,
  `SafetyStock` decimal(18,2) DEFAULT NULL,
  `Product_Pic_Id` int(11) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`SkuProduct_Id`),
  KEY `Product_Id` (`Product_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skuproduct`
--

LOCK TABLES `skuproduct` WRITE;
/*!40000 ALTER TABLE `skuproduct` DISABLE KEYS */;
INSERT INTO `skuproduct` VALUES (1,1,1,'G000000002','default','',200.00,NULL,0.00,0,1);
/*!40000 ALTER TABLE `skuproduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `skuquotedprice_v`
--

DROP TABLE IF EXISTS `skuquotedprice_v`;
/*!50001 DROP VIEW IF EXISTS `skuquotedprice_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `skuquotedprice_v` AS SELECT 
 1 AS `PurchasePrice_Id`,
 1 AS `Product_Id`,
 1 AS `SkuProduct_Id`,
 1 AS `Supplier_Id`,
 1 AS `PurAddress`,
 1 AS `QuotedPrice`,
 1 AS `Period`,
 1 AS `Remark`,
 1 AS `GlobalArea_Id`,
 1 AS `EnableFlag`,
 1 AS `PropValues`,
 1 AS `PV_Txt`,
 1 AS `SuppName`,
 1 AS `Seq`,
 1 AS `SkuSeq`,
 1 AS `PdcSeq`,
 1 AS `ProdName`,
 1 AS `Unit`,
 1 AS `ProdCode`,
 1 AS `Cost`,
 1 AS `Product_Pic_Id`,
 1 AS `S_Address`,
 1 AS `LRCode`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `smt_eo_temp_pdf`
--

DROP TABLE IF EXISTS `smt_eo_temp_pdf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `smt_eo_temp_pdf` (
  `SMT_EO_Temp_PDF_Id` int(11) NOT NULL,
  `SaleSite_Id` int(11) DEFAULT NULL,
  `FileName` varchar(50) DEFAULT NULL,
  `TrackingNumbers` text,
  PRIMARY KEY (`SMT_EO_Temp_PDF_Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `smt_eo_temp_pdf`
--

LOCK TABLES `smt_eo_temp_pdf` WRITE;
/*!40000 ALTER TABLE `smt_eo_temp_pdf` DISABLE KEYS */;
/*!40000 ALTER TABLE `smt_eo_temp_pdf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `smt_temp_shiplable`
--

DROP TABLE IF EXISTS `smt_temp_shiplable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `smt_temp_shiplable` (
  `SMT_Temp_ShipLable_Id` int(11) NOT NULL,
  `RequestUrl` text,
  `PDFFilePath` text,
  `SMTError` text,
  `SaleSite_Id` int(11) DEFAULT NULL,
  PRIMARY KEY (`SMT_Temp_ShipLable_Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `smt_temp_shiplable`
--

LOCK TABLES `smt_temp_shiplable` WRITE;
/*!40000 ALTER TABLE `smt_temp_shiplable` DISABLE KEYS */;
/*!40000 ALTER TABLE `smt_temp_shiplable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `smttasklog`
--

DROP TABLE IF EXISTS `smttasklog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `smttasklog` (
  `SMTTaskLog_Id` int(11) NOT NULL,
  `SMTTask` varchar(50) DEFAULT NULL,
  `SOCode` varchar(50) DEFAULT NULL,
  `Message` text,
  `TaskTime` datetime DEFAULT NULL,
  PRIMARY KEY (`SMTTaskLog_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `smttasklog`
--

LOCK TABLES `smttasklog` WRITE;
/*!40000 ALTER TABLE `smttasklog` DISABLE KEYS */;
/*!40000 ALTER TABLE `smttasklog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `so_custom`
--

DROP TABLE IF EXISTS `so_custom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `so_custom` (
  `SO_Custom_Id` int(11) NOT NULL,
  `SaleOrder_Id` int(11) DEFAULT NULL,
  `SO_ExpService_Id` int(11) DEFAULT NULL,
  `CustomProdName` varchar(50) DEFAULT NULL,
  `CustomProdName_CN` varchar(50) DEFAULT NULL,
  `CustomQty` decimal(16,4) DEFAULT NULL,
  `CustomValue` decimal(16,4) DEFAULT NULL,
  `CustomCode` varchar(50) DEFAULT NULL,
  `FactoryCountry` int(11) DEFAULT NULL,
  `CustomMaterial` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`SO_Custom_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `so_custom`
--

LOCK TABLES `so_custom` WRITE;
/*!40000 ALTER TABLE `so_custom` DISABLE KEYS */;
INSERT INTO `so_custom` VALUES (1,1,1,'汽车轮毂-A','',1.0000,0.0000,'',0,'');
/*!40000 ALTER TABLE `so_custom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `so_expservice`
--

DROP TABLE IF EXISTS `so_expservice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `so_expservice` (
  `SO_ExpService_Id` int(11) NOT NULL,
  `SaleOrder_Id` int(11) DEFAULT NULL,
  `Weight` decimal(18,4) DEFAULT NULL,
  `Length` decimal(18,2) DEFAULT NULL,
  `Width` decimal(18,2) DEFAULT NULL,
  `Height` decimal(18,2) DEFAULT NULL,
  `ExpressService_Id` int(11) DEFAULT NULL,
  `ExpressServiceName` varchar(50) DEFAULT NULL,
  `IsTrack` int(11) DEFAULT NULL,
  `ExpServicePrice` decimal(18,2) DEFAULT NULL,
  `EstimatedShipTime` datetime DEFAULT NULL,
  `EstimatedArriveTime` datetime DEFAULT NULL,
  `LstSolution_Id` int(11) DEFAULT NULL,
  `LstCompanyName` varchar(50) DEFAULT NULL,
  `LstSolutionName` varchar(50) DEFAULT NULL,
  `ExpServiceCost` decimal(18,2) DEFAULT NULL,
  `RvFullName` varchar(255) DEFAULT NULL,
  `RvTel` varchar(50) DEFAULT NULL,
  `GlobalArea_Id` int(11) DEFAULT NULL,
  `RvProvince` varchar(255) DEFAULT NULL,
  `RvCity` varchar(255) DEFAULT NULL,
  `RvPostCode` varchar(50) DEFAULT NULL,
  `RvAddress_1` varchar(255) DEFAULT NULL,
  `RvAddress_2` varchar(255) DEFAULT NULL,
  `Warehouse_Id` int(11) DEFAULT NULL,
  PRIMARY KEY (`SO_ExpService_Id`),
  KEY `SaleOrder_Id` (`SaleOrder_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `so_expservice`
--

LOCK TABLES `so_expservice` WRITE;
/*!40000 ALTER TABLE `so_expservice` DISABLE KEYS */;
INSERT INTO `so_expservice` VALUES (1,1,1.0000,0.00,0.00,0.00,1,'经济型快递服务',1,0.00,'2016-10-25 00:00:00','2016-11-24 00:00:00',1,'物流公司A','物流方案A',16.22,'xxx','xxx',122,'xxx','xxx','xxx','xxxxxxxxxxxx','',1);
/*!40000 ALTER TABLE `so_expservice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `so_giftitem`
--

DROP TABLE IF EXISTS `so_giftitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `so_giftitem` (
  `SO_GiftItem_Id` int(11) NOT NULL,
  `SO_Product_Id` int(11) DEFAULT NULL,
  `SaleOrder_Id` int(11) DEFAULT NULL,
  `Product_Id` int(11) DEFAULT NULL,
  `SkuProduct_Id` int(11) DEFAULT NULL,
  `SkuProdCode` varchar(20) DEFAULT NULL,
  `ProdName` varchar(100) DEFAULT NULL,
  `ProdUnit` varchar(10) DEFAULT NULL,
  `SkuProps` varchar(50) DEFAULT NULL,
  `Qty` decimal(18,2) DEFAULT NULL,
  `Remaining` decimal(18,2) DEFAULT NULL,
  `Cost` decimal(18,2) DEFAULT NULL,
  `Weight` decimal(18,4) DEFAULT NULL,
  PRIMARY KEY (`SO_GiftItem_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `so_giftitem`
--

LOCK TABLES `so_giftitem` WRITE;
/*!40000 ALTER TABLE `so_giftitem` DISABLE KEYS */;
/*!40000 ALTER TABLE `so_giftitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `so_gproduct`
--

DROP TABLE IF EXISTS `so_gproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `so_gproduct` (
  `SO_GProduct_Id` int(11) NOT NULL,
  `SO_Product_Id` int(11) DEFAULT NULL,
  `SaleOrder_Id` int(11) DEFAULT NULL,
  `Product_Id` int(11) DEFAULT NULL,
  `SkuProduct_Id` int(11) DEFAULT NULL,
  `SkuProdCode` varchar(50) DEFAULT NULL,
  `ProdName` varchar(255) DEFAULT NULL,
  `ProdUnit` varchar(10) DEFAULT NULL,
  `SkuProps` varchar(50) DEFAULT NULL,
  `Qty` decimal(18,2) DEFAULT NULL,
  `Cost` decimal(18,2) DEFAULT NULL,
  `Weight` decimal(18,4) DEFAULT NULL,
  PRIMARY KEY (`SO_GProduct_Id`),
  KEY `SaleOrder_Id` (`SaleOrder_Id`),
  KEY `SkuProduct_Id` (`SkuProduct_Id`),
  KEY `SO_Product_Id` (`SO_Product_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `so_gproduct`
--

LOCK TABLES `so_gproduct` WRITE;
/*!40000 ALTER TABLE `so_gproduct` DISABLE KEYS */;
INSERT INTO `so_gproduct` VALUES (1,1,1,1,1,'G000000002','汽车轮毂-A','件','默认',1.00,30.04,1.0000);
/*!40000 ALTER TABLE `so_gproduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `so_innerprod_v`
--

DROP TABLE IF EXISTS `so_innerprod_v`;
/*!50001 DROP VIEW IF EXISTS `so_innerprod_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `so_innerprod_v` AS SELECT 
 1 AS `SaleOrder_Id`,
 1 AS `Product_Id`,
 1 AS `SkuProduct_Id`,
 1 AS `Qty`,
 1 AS `Type`,
 1 AS `SkuProdCode`,
 1 AS `ProdName`,
 1 AS `SkuProps`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `so_product`
--

DROP TABLE IF EXISTS `so_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `so_product` (
  `SO_Product_Id` int(11) NOT NULL,
  `SaleOrder_Id` int(11) DEFAULT NULL,
  `SS_Product_Id` int(11) DEFAULT NULL,
  `SS_InnerProd_Id` int(11) DEFAULT NULL,
  `ProdCode` varchar(50) DEFAULT NULL,
  `ProdPicUrl` varchar(255) DEFAULT NULL,
  `SkuProdCode` varchar(50) DEFAULT NULL,
  `ProdName` varchar(255) DEFAULT NULL,
  `ProdUnit` varchar(10) DEFAULT NULL,
  `SkuProps` varchar(50) DEFAULT NULL,
  `Qty` decimal(18,2) DEFAULT NULL,
  `ListPrice` decimal(18,2) DEFAULT NULL,
  `Discount` decimal(18,2) DEFAULT NULL,
  `SalePrice` decimal(18,2) DEFAULT NULL,
  `OtherCost` decimal(18,2) DEFAULT NULL,
  `TransCost` decimal(18,2) DEFAULT NULL,
  `SO_Gift_Id` int(11) DEFAULT NULL,
  `GiftName` varchar(255) DEFAULT NULL,
  `BoxWeight` decimal(18,4) DEFAULT NULL,
  `BoxLength` decimal(18,2) DEFAULT NULL,
  `BoxWidth` decimal(18,2) DEFAULT NULL,
  `BoxHeight` decimal(18,2) DEFAULT NULL,
  PRIMARY KEY (`SO_Product_Id`),
  KEY `SaleOrder_Id` (`SaleOrder_Id`),
  KEY `SS_Product_Id` (`SS_Product_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `so_product`
--

LOCK TABLES `so_product` WRITE;
/*!40000 ALTER TABLE `so_product` DISABLE KEYS */;
INSERT INTO `so_product` VALUES (1,1,1,1,'S000000001','','S000000001','汽车轮毂-A','pcs','默认',1.00,100.00,1.00,100.00,1.00,0.10,0,'',0.0000,0.00,0.00,0.00);
/*!40000 ALTER TABLE `so_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ss_expservice`
--

DROP TABLE IF EXISTS `ss_expservice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ss_expservice` (
  `SS_ExpService_Id` int(11) NOT NULL,
  `SS_Product_Id` int(11) DEFAULT NULL,
  `SalePlatform_Id` int(11) DEFAULT NULL,
  `SaleSite_Id` int(11) DEFAULT NULL,
  `GlobalArea_Id` int(11) DEFAULT NULL,
  `ExpressService_Id` int(11) DEFAULT NULL,
  `FstCharge` decimal(18,2) DEFAULT NULL,
  `IncreaseCharge` decimal(18,2) DEFAULT NULL,
  `State` int(11) DEFAULT NULL,
  PRIMARY KEY (`SS_ExpService_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ss_expservice`
--

LOCK TABLES `ss_expservice` WRITE;
/*!40000 ALTER TABLE `ss_expservice` DISABLE KEYS */;
/*!40000 ALTER TABLE `ss_expservice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ss_gift`
--

DROP TABLE IF EXISTS `ss_gift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ss_gift` (
  `SS_Gift_Id` int(11) NOT NULL,
  `SS_Product_Id` int(11) DEFAULT NULL,
  `SalePlatform_Id` int(11) DEFAULT NULL,
  `SaleSite_Id` int(11) DEFAULT NULL,
  `Qty` decimal(18,2) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`SS_Gift_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ss_gift`
--

LOCK TABLES `ss_gift` WRITE;
/*!40000 ALTER TABLE `ss_gift` DISABLE KEYS */;
/*!40000 ALTER TABLE `ss_gift` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ss_gift_item`
--

DROP TABLE IF EXISTS `ss_gift_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ss_gift_item` (
  `SS_Gift_Item_Id` int(11) NOT NULL,
  `SS_Gift_Id` int(11) DEFAULT NULL,
  `SaleSite_Id` int(11) DEFAULT NULL,
  `SalePlatform_Id` int(11) DEFAULT NULL,
  `SS_Product_Id` int(11) DEFAULT NULL,
  `SkuProduct_Id` int(11) DEFAULT NULL,
  `Qty` decimal(18,2) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`SS_Gift_Item_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ss_gift_item`
--

LOCK TABLES `ss_gift_item` WRITE;
/*!40000 ALTER TABLE `ss_gift_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `ss_gift_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ss_gift_res`
--

DROP TABLE IF EXISTS `ss_gift_res`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ss_gift_res` (
  `SS_Gift_Res_Id` int(11) NOT NULL,
  `SS_Gift_Id` int(11) DEFAULT NULL,
  `LRCode` varchar(10) DEFAULT NULL,
  `GiftName` varchar(100) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`SS_Gift_Res_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ss_gift_res`
--

LOCK TABLES `ss_gift_res` WRITE;
/*!40000 ALTER TABLE `ss_gift_res` DISABLE KEYS */;
/*!40000 ALTER TABLE `ss_gift_res` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ss_innerprod`
--

DROP TABLE IF EXISTS `ss_innerprod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ss_innerprod` (
  `SS_InnerProd_Id` int(11) NOT NULL,
  `SS_Product_Id` int(11) DEFAULT NULL,
  `SalePlatform_Id` int(11) DEFAULT NULL,
  `SaleSite_Id` int(11) DEFAULT NULL,
  `Seq` int(11) DEFAULT NULL,
  `PropValues` varchar(255) DEFAULT NULL,
  `PV_Txt` varchar(255) DEFAULT NULL,
  `SkuProduct_Ids` varchar(255) DEFAULT NULL,
  `ProdCode` varchar(20) DEFAULT NULL,
  `Product_Pic_Id` int(11) DEFAULT NULL,
  `BoxWeight` decimal(18,4) DEFAULT NULL,
  `PackageWeight` decimal(18,4) DEFAULT NULL,
  `BoxLength` decimal(18,2) DEFAULT NULL,
  `BoxWidth` decimal(18,2) DEFAULT NULL,
  `BoxHeight` decimal(18,2) DEFAULT NULL,
  `CustomValue` decimal(18,2) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`SS_InnerProd_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ss_innerprod`
--

LOCK TABLES `ss_innerprod` WRITE;
/*!40000 ALTER TABLE `ss_innerprod` DISABLE KEYS */;
INSERT INTO `ss_innerprod` VALUES (1,1,8,4,1,'default','','#1#','S000000001',0,0.0000,1.0000,0.00,0.00,0.00,0.00,1);
/*!40000 ALTER TABLE `ss_innerprod` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ss_innerprod_sku_rel`
--

DROP TABLE IF EXISTS `ss_innerprod_sku_rel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ss_innerprod_sku_rel` (
  `SS_InnerProd_Sku_Rel_Id` int(11) NOT NULL,
  `SS_Product_Id` int(11) DEFAULT NULL,
  `SS_InnerProd_Id` int(11) DEFAULT NULL,
  `SkuProduct_Id` int(11) DEFAULT NULL,
  `RelQty` decimal(18,2) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`SS_InnerProd_Sku_Rel_Id`),
  KEY `SkuProduct_Id` (`SkuProduct_Id`),
  KEY `SS_Product_Id` (`SS_Product_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ss_innerprod_sku_rel`
--

LOCK TABLES `ss_innerprod_sku_rel` WRITE;
/*!40000 ALTER TABLE `ss_innerprod_sku_rel` DISABLE KEYS */;
INSERT INTO `ss_innerprod_sku_rel` VALUES (1,1,1,1,1.00,1);
/*!40000 ALTER TABLE `ss_innerprod_sku_rel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ss_prodprofit_v`
--

DROP TABLE IF EXISTS `ss_prodprofit_v`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ss_prodprofit_v` (
  `SS_ProdProfit_V_Id` int(11) NOT NULL,
  `SS_Product_Id` int(11) DEFAULT NULL,
  `SS_InnerProd_Ids` text,
  `ExpressService_Id` int(11) DEFAULT NULL,
  `GlobalArea_Ids` text,
  `SaleSite_Id` int(11) DEFAULT NULL,
  `FstProdProfit` decimal(18,2) DEFAULT NULL,
  `SecondProdProfit` decimal(18,2) DEFAULT NULL,
  `ThirdProdProfit` decimal(18,2) DEFAULT NULL,
  PRIMARY KEY (`SS_ProdProfit_V_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ss_prodprofit_v`
--

LOCK TABLES `ss_prodprofit_v` WRITE;
/*!40000 ALTER TABLE `ss_prodprofit_v` DISABLE KEYS */;
INSERT INTO `ss_prodprofit_v` VALUES (1,1,'#1#',1,'#122#',4,43.00,87.00,177.00);
/*!40000 ALTER TABLE `ss_prodprofit_v` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ss_product`
--

DROP TABLE IF EXISTS `ss_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ss_product` (
  `SS_Product_Id` int(11) NOT NULL,
  `SalePlatform_Id` int(11) DEFAULT NULL,
  `SaleSite_Id` int(11) DEFAULT NULL,
  `ProdCode` varchar(50) DEFAULT NULL,
  `SKUProps` varchar(255) DEFAULT NULL,
  `Brand_Id` int(11) DEFAULT NULL,
  `ExpandProps` varchar(255) DEFAULT NULL,
  `ProdProperty_Ids` varchar(255) DEFAULT NULL,
  `PropValues` varchar(255) DEFAULT NULL,
  `PicFile` varchar(255) DEFAULT NULL,
  `GiftWeightLimit` decimal(18,4) DEFAULT NULL,
  `GiftCostLimit` decimal(18,2) DEFAULT NULL,
  `State` int(11) DEFAULT NULL,
  `AvailableUnitCount` int(11) DEFAULT NULL,
  `MinCost` decimal(18,2) DEFAULT NULL,
  `MaxCost` decimal(18,2) DEFAULT NULL,
  `MinListPrice` decimal(18,2) DEFAULT NULL,
  `MaxListPrice` decimal(18,2) DEFAULT NULL,
  `MinDiscount` decimal(18,2) DEFAULT NULL,
  `MaxDiscount` decimal(18,2) DEFAULT NULL,
  `MinSalePrice` decimal(18,2) DEFAULT NULL,
  `MaxSalePrice` decimal(18,2) DEFAULT NULL,
  `MinProfit` decimal(18,2) DEFAULT NULL,
  `MaxProfit` decimal(18,2) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  `OnlineTime` datetime DEFAULT NULL,
  `SS_ProdCategory_Id` int(11) DEFAULT NULL,
  `Tags` text,
  `SMT_Product_Id` varchar(50) DEFAULT NULL,
  `IsStyleHtmlTag` int(11) DEFAULT NULL,
  `RemarkToSMT` int(11) DEFAULT NULL,
  `PropToSMT` int(11) DEFAULT NULL,
  PRIMARY KEY (`SS_Product_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ss_product`
--

LOCK TABLES `ss_product` WRITE;
/*!40000 ALTER TABLE `ss_product` DISABLE KEYS */;
INSERT INTO `ss_product` VALUES (1,8,4,'S000000001','',0,'','','',NULL,0.0000,0.00,2,1,30.04,30.04,100.00,100.00,1.00,1.00,100.00,100.00,43.00,43.00,1,'2016-10-23 21:31:15',1,'','',0,0,0);
/*!40000 ALTER TABLE `ss_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `ss_product_full_v`
--

DROP TABLE IF EXISTS `ss_product_full_v`;
/*!50001 DROP VIEW IF EXISTS `ss_product_full_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `ss_product_full_v` AS SELECT 
 1 AS `SS_Product_Key`,
 1 AS `SS_Product_Id`,
 1 AS `Brand_Id`,
 1 AS `SKUProps`,
 1 AS `ExpandProps`,
 1 AS `ProdProperty_Ids`,
 1 AS `PropValues`,
 1 AS `ProdCode`,
 1 AS `GiftWeightLimit`,
 1 AS `GiftCostLimit`,
 1 AS `AvailableUnitCount`,
 1 AS `MinCost`,
 1 AS `MaxCost`,
 1 AS `MinListPrice`,
 1 AS `MaxListPrice`,
 1 AS `MinDiscount`,
 1 AS `MaxDiscount`,
 1 AS `MinSalePrice`,
 1 AS `MaxSalePrice`,
 1 AS `MinProfit`,
 1 AS `MaxProfit`,
 1 AS `State`,
 1 AS `PicFile`,
 1 AS `SalePlatform_Id`,
 1 AS `SaleSite_Id`,
 1 AS `Tags`,
 1 AS `LRCode`,
 1 AS `ProdName`,
 1 AS `Unit`,
 1 AS `Remark`,
 1 AS `Seq`,
 1 AS `ProdSeq`,
 1 AS `SS_Product_Seq_Id`,
 1 AS `SS_ProdCategory_Id`,
 1 AS `ProdCategory_Id`,
 1 AS `PdcIndexs`,
 1 AS `EnableFlag`,
 1 AS `OnlineTime`,
 1 AS `SMT_Product_Id`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `ss_product_pdc_v`
--

DROP TABLE IF EXISTS `ss_product_pdc_v`;
/*!50001 DROP VIEW IF EXISTS `ss_product_pdc_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `ss_product_pdc_v` AS SELECT 
 1 AS `SS_Product_Key`,
 1 AS `SS_Product_Id`,
 1 AS `Brand_Id`,
 1 AS `SKUProps`,
 1 AS `ExpandProps`,
 1 AS `ProdProperty_Ids`,
 1 AS `PropValues`,
 1 AS `ProdCode`,
 1 AS `GiftWeightLimit`,
 1 AS `GiftCostLimit`,
 1 AS `AvailableUnitCount`,
 1 AS `MinCost`,
 1 AS `MaxCost`,
 1 AS `MinListPrice`,
 1 AS `MaxListPrice`,
 1 AS `MinDiscount`,
 1 AS `MaxDiscount`,
 1 AS `MinSalePrice`,
 1 AS `MaxSalePrice`,
 1 AS `MinProfit`,
 1 AS `MaxProfit`,
 1 AS `State`,
 1 AS `PicFile`,
 1 AS `SalePlatform_Id`,
 1 AS `SaleSite_Id`,
 1 AS `LRCode`,
 1 AS `ProdName`,
 1 AS `Unit`,
 1 AS `Seq`,
 1 AS `SS_Product_Seq_Id`,
 1 AS `SS_ProdCategory_Id`,
 1 AS `ProdCategory_Id`,
 1 AS `PdcIndexs`,
 1 AS `EnableFlag`,
 1 AS `OnlineTime`,
 1 AS `SMT_Product_Id`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `ss_product_res`
--

DROP TABLE IF EXISTS `ss_product_res`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ss_product_res` (
  `SS_Product_Res_Id` int(11) NOT NULL,
  `SS_Product_Id` int(11) DEFAULT NULL,
  `ProdName` varchar(255) DEFAULT NULL,
  `Unit` varchar(10) DEFAULT NULL,
  `Remark` longtext,
  `LRCode` varchar(10) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`SS_Product_Res_Id`),
  KEY `SS_Product_Id` (`SS_Product_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ss_product_res`
--

LOCK TABLES `ss_product_res` WRITE;
/*!40000 ALTER TABLE `ss_product_res` DISABLE KEYS */;
INSERT INTO `ss_product_res` VALUES (1,1,'汽车轮毂-A','pcs','-1','zh-cn',1),(2,1,'汽车轮毂-A','pcs','-1','en-us',1);
/*!40000 ALTER TABLE `ss_product_res` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ss_product_seq`
--

DROP TABLE IF EXISTS `ss_product_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ss_product_seq` (
  `SS_Product_Seq_Id` int(11) NOT NULL,
  `SS_ProdCategory_Id` int(11) DEFAULT NULL,
  `SS_Product_Id` int(11) DEFAULT NULL,
  `Seq` int(11) DEFAULT NULL,
  PRIMARY KEY (`SS_Product_Seq_Id`),
  KEY `SS_Product_Id` (`SS_Product_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ss_product_seq`
--

LOCK TABLES `ss_product_seq` WRITE;
/*!40000 ALTER TABLE `ss_product_seq` DISABLE KEYS */;
INSERT INTO `ss_product_seq` VALUES (1,1,1,1);
/*!40000 ALTER TABLE `ss_product_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `ss_product_simple_v`
--

DROP TABLE IF EXISTS `ss_product_simple_v`;
/*!50001 DROP VIEW IF EXISTS `ss_product_simple_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `ss_product_simple_v` AS SELECT 
 1 AS `SS_Product_Id`,
 1 AS `Brand_Id`,
 1 AS `SKUProps`,
 1 AS `ExpandProps`,
 1 AS `ProdProperty_Ids`,
 1 AS `PropValues`,
 1 AS `ProdCode`,
 1 AS `GiftWeightLimit`,
 1 AS `GiftCostLimit`,
 1 AS `AvailableUnitCount`,
 1 AS `MinCost`,
 1 AS `MaxCost`,
 1 AS `MinListPrice`,
 1 AS `MaxListPrice`,
 1 AS `MinDiscount`,
 1 AS `MaxDiscount`,
 1 AS `MinSalePrice`,
 1 AS `MaxSalePrice`,
 1 AS `MinProfit`,
 1 AS `MaxProfit`,
 1 AS `State`,
 1 AS `PicFile`,
 1 AS `SalePlatform_Id`,
 1 AS `SaleSite_Id`,
 1 AS `SS_ProdCategory_Id`,
 1 AS `LRCode`,
 1 AS `ProdName`,
 1 AS `Unit`,
 1 AS `EnableFlag`,
 1 AS `OnlineTime`,
 1 AS `SMT_Product_Id`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `ss_product_v`
--

DROP TABLE IF EXISTS `ss_product_v`;
/*!50001 DROP VIEW IF EXISTS `ss_product_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `ss_product_v` AS SELECT 
 1 AS `SS_Product_Key`,
 1 AS `SS_Product_Id`,
 1 AS `Brand_Id`,
 1 AS `SKUProps`,
 1 AS `ExpandProps`,
 1 AS `ProdProperty_Ids`,
 1 AS `PropValues`,
 1 AS `ProdCode`,
 1 AS `GiftWeightLimit`,
 1 AS `GiftCostLimit`,
 1 AS `AvailableUnitCount`,
 1 AS `MinCost`,
 1 AS `MaxCost`,
 1 AS `MinListPrice`,
 1 AS `MaxListPrice`,
 1 AS `MinDiscount`,
 1 AS `MaxDiscount`,
 1 AS `MinSalePrice`,
 1 AS `MaxSalePrice`,
 1 AS `MinProfit`,
 1 AS `MaxProfit`,
 1 AS `State`,
 1 AS `PicFile`,
 1 AS `SalePlatform_Id`,
 1 AS `SaleSite_Id`,
 1 AS `Tags`,
 1 AS `LRCode`,
 1 AS `ProdName`,
 1 AS `Unit`,
 1 AS `ProdSeq`,
 1 AS `Seq`,
 1 AS `SS_Product_Seq_Id`,
 1 AS `SS_ProdCategory_Id`,
 1 AS `ProdCategory_Id`,
 1 AS `PdcIndexs`,
 1 AS `EnableFlag`,
 1 AS `OnlineTime`,
 1 AS `SMT_Product_Id`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `ss_saleprice`
--

DROP TABLE IF EXISTS `ss_saleprice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ss_saleprice` (
  `SS_SalePrice_Id` int(11) NOT NULL,
  `SS_InnerProd_Id` int(11) DEFAULT NULL,
  `SS_Product_Id` int(11) DEFAULT NULL,
  `SalePlatform_Id` int(11) DEFAULT NULL,
  `SaleSite_Id` int(11) DEFAULT NULL,
  `ListPrice` decimal(18,2) DEFAULT NULL,
  `Discount` decimal(18,2) DEFAULT NULL,
  `SalePrice` decimal(18,2) DEFAULT NULL,
  `PurchaseCost` decimal(18,2) DEFAULT NULL,
  `TransCost` decimal(18,2) DEFAULT NULL,
  `OtherCost` decimal(18,2) DEFAULT NULL,
  `Seq` int(11) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`SS_SalePrice_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ss_saleprice`
--

LOCK TABLES `ss_saleprice` WRITE;
/*!40000 ALTER TABLE `ss_saleprice` DISABLE KEYS */;
INSERT INTO `ss_saleprice` VALUES (1,1,1,8,4,100.00,1.00,100.00,30.04,0.10,1.00,1,1);
/*!40000 ALTER TABLE `ss_saleprice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ssprodcodecount`
--

DROP TABLE IF EXISTS `ssprodcodecount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ssprodcodecount` (
  `SSProdCode_Id` int(11) NOT NULL,
  `MaxCount` int(11) DEFAULT NULL,
  PRIMARY KEY (`SSProdCode_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ssprodcodecount`
--

LOCK TABLES `ssprodcodecount` WRITE;
/*!40000 ALTER TABLE `ssprodcodecount` DISABLE KEYS */;
INSERT INTO `ssprodcodecount` VALUES (1,1);
/*!40000 ALTER TABLE `ssprodcodecount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `supplier` (
  `Supplier_Id` int(11) NOT NULL,
  `GlobalArea_Id` int(11) DEFAULT NULL,
  `Seq` int(11) DEFAULT NULL,
  `S_Email` varchar(255) DEFAULT NULL,
  `S_WebSite` varchar(255) DEFAULT NULL,
  `S_Tel` varchar(50) DEFAULT NULL,
  `S_Fax` varchar(50) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`Supplier_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `supplier_purchaseprod_v`
--

DROP TABLE IF EXISTS `supplier_purchaseprod_v`;
/*!50001 DROP VIEW IF EXISTS `supplier_purchaseprod_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `supplier_purchaseprod_v` AS SELECT 
 1 AS `SkuProduct_Id`,
 1 AS `Product_Id`,
 1 AS `SkuProdCode`,
 1 AS `ProdName`,
 1 AS `Unit`,
 1 AS `PV_Txt`,
 1 AS `Cost`,
 1 AS `BrowsePicUrl`,
 1 AS `RequestQty`,
 1 AS `RunningQty`,
 1 AS `LRCode`,
 1 AS `Seq`,
 1 AS `SkuSeq`,
 1 AS `PdcSeq`,
 1 AS `PdcIndexs`,
 1 AS `ProdCategory_Id`,
 1 AS `Supplier_Id`,
 1 AS `QuotedPrice`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `supplier_res`
--

DROP TABLE IF EXISTS `supplier_res`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `supplier_res` (
  `Supplier_Res_Id` int(11) NOT NULL,
  `Supplier_Id` int(11) DEFAULT NULL,
  `SuppName` varchar(50) DEFAULT NULL,
  `S_Remark` varchar(255) DEFAULT NULL,
  `LRCode` varchar(10) DEFAULT NULL,
  `S_Address` varchar(255) DEFAULT NULL,
  `S_ProdRemark` varchar(255) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`Supplier_Res_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier_res`
--

LOCK TABLES `supplier_res` WRITE;
/*!40000 ALTER TABLE `supplier_res` DISABLE KEYS */;
/*!40000 ALTER TABLE `supplier_res` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `supplier_v`
--

DROP TABLE IF EXISTS `supplier_v`;
/*!50001 DROP VIEW IF EXISTS `supplier_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `supplier_v` AS SELECT 
 1 AS `Supplier_Id`,
 1 AS `GlobalArea_Id`,
 1 AS `Seq`,
 1 AS `S_Email`,
 1 AS `S_WebSite`,
 1 AS `S_Tel`,
 1 AS `S_Fax`,
 1 AS `EnableFlag`,
 1 AS `SuppName`,
 1 AS `S_Remark`,
 1 AS `S_Address`,
 1 AS `S_ProdRemark`,
 1 AS `LRCode`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `supplierlinker`
--

DROP TABLE IF EXISTS `supplierlinker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `supplierlinker` (
  `SupplierLinker_Id` int(11) NOT NULL,
  `Seq` int(11) DEFAULT NULL,
  `S_LEmail` varchar(255) DEFAULT NULL,
  `S_LTel` varchar(50) DEFAULT NULL,
  `Supplier_Id` int(11) DEFAULT NULL,
  PRIMARY KEY (`SupplierLinker_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplierlinker`
--

LOCK TABLES `supplierlinker` WRITE;
/*!40000 ALTER TABLE `supplierlinker` DISABLE KEYS */;
/*!40000 ALTER TABLE `supplierlinker` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplierlinker_res`
--

DROP TABLE IF EXISTS `supplierlinker_res`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `supplierlinker_res` (
  `SupplierLinker_Res_Id` int(11) NOT NULL,
  `SupplierLinker_Id` int(11) DEFAULT NULL,
  `S_LinkerName` varchar(50) DEFAULT NULL,
  `S_LTitle` varchar(50) DEFAULT NULL,
  `S_LRemark` varchar(255) DEFAULT NULL,
  `LRCode` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`SupplierLinker_Res_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplierlinker_res`
--

LOCK TABLES `supplierlinker_res` WRITE;
/*!40000 ALTER TABLE `supplierlinker_res` DISABLE KEYS */;
/*!40000 ALTER TABLE `supplierlinker_res` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `syscurrency`
--

DROP TABLE IF EXISTS `syscurrency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `syscurrency` (
  `SysCurrency_Id` int(11) NOT NULL,
  `Seq` int(11) DEFAULT NULL,
  `CurrCode` varchar(20) DEFAULT NULL,
  `CurrSymbol` varchar(5) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`SysCurrency_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `syscurrency`
--

LOCK TABLES `syscurrency` WRITE;
/*!40000 ALTER TABLE `syscurrency` DISABLE KEYS */;
INSERT INTO `syscurrency` VALUES (1,1,'CNY','￥',1),(2,2,'USD','$',1),(3,3,'EUR','€',1),(4,4,'GBP','￡',1),(5,5,'HKD','HK＄',1),(6,6,'CAD','C$',1);
/*!40000 ALTER TABLE `syscurrency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `syscurrency_res`
--

DROP TABLE IF EXISTS `syscurrency_res`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `syscurrency_res` (
  `SysCurrency_Res_Id` int(11) NOT NULL,
  `SysCurrency_Id` int(11) DEFAULT NULL,
  `LRCode` varchar(10) DEFAULT NULL,
  `CurrName` varchar(20) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`SysCurrency_Res_Id`),
  KEY `SysCurrency_Id` (`SysCurrency_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `syscurrency_res`
--

LOCK TABLES `syscurrency_res` WRITE;
/*!40000 ALTER TABLE `syscurrency_res` DISABLE KEYS */;
INSERT INTO `syscurrency_res` VALUES (1,1,'zh-cn','人民币',1),(2,1,'en-us','人民币',1),(3,2,'zh-cn','美元',1),(4,2,'en-us','美元',1),(5,3,'zh-cn','欧元',1),(6,3,'en-us','欧元',1),(7,4,'zh-cn','英镑',1),(8,4,'en-us','英镑',1),(9,5,'zh-cn','港币',1),(10,5,'en-us','港币',1),(11,6,'zh-cn','加币',1),(12,6,'en-us','加币',1);
/*!40000 ALTER TABLE `syscurrency_res` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `syscurrrate`
--

DROP TABLE IF EXISTS `syscurrrate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `syscurrrate` (
  `SysCurrRate_Id` int(11) NOT NULL,
  `SysCurrency_Id_A` int(11) DEFAULT NULL,
  `SysCurrency_Id_B` int(11) DEFAULT NULL,
  `Rate` decimal(18,4) DEFAULT NULL,
  `RateDate` datetime DEFAULT NULL,
  PRIMARY KEY (`SysCurrRate_Id`),
  KEY `SysCurrency_Id_A` (`SysCurrency_Id_A`),
  KEY `SysCurrency_Id_B` (`SysCurrency_Id_B`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `syscurrrate`
--

LOCK TABLES `syscurrrate` WRITE;
/*!40000 ALTER TABLE `syscurrrate` DISABLE KEYS */;
INSERT INTO `syscurrrate` VALUES (1,1,2,0.1502,'2016-07-28 17:18:34'),(2,1,3,0.1462,'2015-11-08 20:09:45'),(3,1,4,0.1043,'2015-11-08 20:10:05'),(4,1,5,1.2185,'2015-11-08 20:10:20'),(5,1,6,0.2088,'2015-11-08 20:10:33'),(6,2,1,6.6571,'2016-07-28 17:18:51'),(7,2,3,0.9297,'2015-11-08 20:11:35'),(8,2,5,7.7507,'2015-11-08 20:12:23'),(9,2,6,1.3283,'2015-11-08 20:12:37'),(10,2,4,0.6637,'2015-11-08 20:13:19'),(11,4,1,9.5836,'2015-11-08 20:15:43'),(12,4,2,1.5066,'2015-11-08 20:15:58'),(13,4,3,1.4007,'2015-11-08 20:16:11'),(14,4,5,11.6772,'2015-11-08 20:16:28'),(15,4,6,2.0012,'2015-11-08 20:16:41'),(16,6,1,4.7889,'2015-11-08 20:18:39'),(17,6,2,0.7528,'2015-11-08 20:18:52'),(18,6,3,0.6999,'2015-11-08 20:19:08'),(19,6,4,0.4997,'2015-11-08 20:19:20'),(20,6,5,5.8351,'2015-11-08 20:19:34'),(21,3,1,6.8420,'2015-11-08 20:14:06'),(22,3,2,1.0756,'2015-11-08 20:14:22'),(23,3,4,0.7139,'2015-11-08 20:14:35'),(24,3,5,8.3367,'2015-11-08 20:14:48'),(25,3,6,1.4287,'2015-11-08 20:15:01'),(26,5,1,0.8207,'2015-11-08 20:17:17'),(27,5,2,0.1290,'2015-11-08 20:17:32'),(28,5,3,0.1200,'2015-11-08 20:17:45'),(29,5,4,0.0856,'2015-11-08 20:17:56'),(30,5,6,0.1714,'2015-11-08 20:18:07'),(31,1,7,0.2230,'2015-11-08 20:10:47'),(32,2,7,1.4182,'2015-11-08 20:13:34'),(33,3,7,1.5255,'2015-11-08 20:15:19'),(34,4,7,2.1367,'2015-11-08 20:16:54'),(35,5,7,0.1830,'2015-11-08 20:18:18'),(36,6,7,1.0677,'2015-11-08 20:19:48'),(37,7,1,4.4852,'2015-11-08 20:20:06'),(38,7,2,0.7051,'2015-11-08 20:20:20'),(39,7,3,0.6555,'2015-11-08 20:20:31'),(40,7,4,0.4680,'2015-11-08 20:20:41'),(41,7,5,5.4650,'2015-11-08 20:20:56'),(42,7,6,0.9366,'2015-11-08 20:21:04'),(43,1,1,1.0000,'2014-11-03 23:41:23');
/*!40000 ALTER TABLE `syscurrrate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sysdataauz`
--

DROP TABLE IF EXISTS `sysdataauz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sysdataauz` (
  `SysDataAUZ_Id` int(11) NOT NULL,
  `SysUser_Id` int(11) DEFAULT NULL,
  `SysRole_Id` int(11) DEFAULT NULL,
  `ObjectType` int(11) DEFAULT NULL,
  `Object_Id` int(11) DEFAULT NULL,
  PRIMARY KEY (`SysDataAUZ_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sysdataauz`
--

LOCK TABLES `sysdataauz` WRITE;
/*!40000 ALTER TABLE `sysdataauz` DISABLE KEYS */;
/*!40000 ALTER TABLE `sysdataauz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sysemail`
--

DROP TABLE IF EXISTS `sysemail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sysemail` (
  `SysEmail_Id` int(11) NOT NULL,
  `Customer_Id` int(11) DEFAULT NULL,
  `SaleSite_Id` int(11) DEFAULT NULL,
  `SaleOrder_Id` int(11) DEFAULT NULL,
  `CustEmail` varchar(50) DEFAULT NULL,
  `EmailTitle` varchar(255) DEFAULT NULL,
  `EmailContent` text,
  `EmailType` int(11) DEFAULT NULL,
  `CreateTime` datetime DEFAULT NULL,
  `SendTime` datetime DEFAULT NULL,
  `State` int(11) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`SysEmail_Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sysemail`
--

LOCK TABLES `sysemail` WRITE;
/*!40000 ALTER TABLE `sysemail` DISABLE KEYS */;
/*!40000 ALTER TABLE `sysemail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `sysemail_v`
--

DROP TABLE IF EXISTS `sysemail_v`;
/*!50001 DROP VIEW IF EXISTS `sysemail_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `sysemail_v` AS SELECT 
 1 AS `SysEmail_Id`,
 1 AS `SaleSite_Id`,
 1 AS `SaleOrder_Id`,
 1 AS `CustEmail`,
 1 AS `EmailTitle`,
 1 AS `EmailType`,
 1 AS `CreateTime`,
 1 AS `SendTime`,
 1 AS `State`,
 1 AS `CustName`,
 1 AS `LRCode`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `sysemailtemplate`
--

DROP TABLE IF EXISTS `sysemailtemplate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sysemailtemplate` (
  `SysEmailTemplate_Id` int(11) NOT NULL,
  `SOSubmitEmailTitle` text,
  `SOSubmitEmailContent` text,
  `SOShipEmailTitle` text,
  `SOShipEmailContent` text,
  `SORemindEmailTitle` text,
  `SORemindEmailContent` text,
  `SOFeedbackEmailTitle` text,
  `SOFeedbackEmailContent` text,
  PRIMARY KEY (`SysEmailTemplate_Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sysemailtemplate`
--

LOCK TABLES `sysemailtemplate` WRITE;
/*!40000 ALTER TABLE `sysemailtemplate` DISABLE KEYS */;
/*!40000 ALTER TABLE `sysemailtemplate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `syserror`
--

DROP TABLE IF EXISTS `syserror`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `syserror` (
  `SysError_Id` int(11) NOT NULL AUTO_INCREMENT,
  `RequestContent` text,
  `RequestCookies` text,
  `ErrorMessage` text,
  `OperaBrowser` varchar(50) DEFAULT NULL,
  `OperaIp` varchar(50) DEFAULT NULL,
  `CreateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`SysError_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `syserror`
--

LOCK TABLES `syserror` WRITE;
/*!40000 ALTER TABLE `syserror` DISABLE KEYS */;
INSERT INTO `syserror` VALUES (1,NULL,'UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%5D%20%7D','ArkEC.SEMs.Business:未将对象引用设置到对象的实例。','InternetExplorer11.0','120.76.200.184','2016-10-15 17:59:36'),(2,'{Action:\'QueryAvaiSaleSites\'}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%2C%7B%20key%3A%20%27clientOpenTime%27%2C%20value%3A%20%271476530426769%27%20%7D%5D%20%7D','mscorlib:给定关键字不在字典中。','Chrome46.0','183.23.5.70','2016-10-15 19:20:52'),(3,'{Action:\'QueryAvaiSaleSites\'}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%2C%7B%20key%3A%20%27clientOpenTime%27%2C%20value%3A%20%271476530487263%27%20%7D%5D%20%7D','mscorlib:给定关键字不在字典中。','Chrome46.0','183.23.5.70','2016-10-15 19:21:40'),(4,'{Action:\'QueryAvaiSaleSites\'}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%2C%7B%20key%3A%20%27clientOpenTime%27%2C%20value%3A%20%271476530588133%27%20%7D%5D%20%7D','mscorlib:给定关键字不在字典中。','Chrome46.0','183.23.5.70','2016-10-15 19:23:11'),(5,'{Action:\'QueryAvaiSaleSites\'}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%2C%7B%20key%3A%20%27clientOpenTime%27%2C%20value%3A%20%271476530588133%27%20%7D%5D%20%7D','mscorlib:给定关键字不在字典中。','Chrome46.0','183.23.5.70','2016-10-15 19:23:15'),(6,'{Action:\'QueryAvaiSaleSites\'}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%2C%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27clientOpenTime%27%2C%20value%3A%20%271476530999659%27%20%7D%5D%20%7D','mscorlib:给定关键字不在字典中。','Chrome46.0','183.23.5.70','2016-10-15 19:30:03'),(7,'{Action:\'QueryAllProdCategory\'}','','ArkEC.CoreCom.Runtime:未将对象引用设置到对象的实例。','Chrome45.0','180.153.205.253','2016-10-17 10:05:23'),(8,'{Action:\'QueryAllBrand\'}','','ArkEC.CoreCom.Runtime:未将对象引用设置到对象的实例。','IE9.0','180.153.211.172','2016-10-17 10:05:38'),(9,'{Action:\'QueryAllProdCategory\'}','','ArkEC.SEMs.Business:未将对象引用设置到对象的实例。','IE9.0','101.226.33.239','2016-10-17 10:08:28'),(10,'{Action:\'QueryCustomers\',BizObj:\"{Keywords:\'\',Page:\'1\',PageNum:\'20\'}\"}','RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%5D%20%7D,UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','Chrome50.0','218.18.170.47','2016-10-22 14:06:54'),(11,'{Action:\'QueryCustomers\',BizObj:\"{Keywords:\'\',Page:\'1\',PageNum:\'20\'}\"}','RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%5D%20%7D,UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','Chrome50.0','218.18.170.47','2016-10-22 14:07:20'),(12,'{Action:\'QueryCustomers\',BizObj:\"{Keywords:\'\',Page:\'1\',PageNum:\'20\'}\"}','RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%5D%20%7D,UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','Chrome50.0','218.18.170.47','2016-10-22 14:07:46'),(13,'{Action:\'QueryCustomers\',BizObj:\"{Keywords:\'\',Page:\'1\',PageNum:\'20\'}\"}','RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%5D%20%7D,UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','Chrome50.0','218.18.170.47','2016-10-22 14:07:53'),(14,'{Action:\'QueryCustomers\',BizObj:\"{Keywords:\'\',Page:\'1\',PageNum:\'20\'}\"}','RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%5D%20%7D,UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','Chrome53.0','58.251.156.85','2016-10-22 14:18:33'),(15,'{Action:\'QueryCustomers\',BizObj:\"{Keywords:\'\',Page:\'1\',PageNum:\'20\'}\"}','RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%5D%20%7D,UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','Chrome53.0','58.251.156.85','2016-10-22 14:18:42'),(16,'{Action:\'QueryCustomers\',BizObj:\"{Keywords:\'\',Page:\'1\',PageNum:\'20\'}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','InternetExplorer11.0','127.0.0.1','2016-10-22 14:20:02'),(17,'{Action:\'QueryCustomers\',BizObj:\"{Keywords:\'\',Page:\'1\',PageNum:\'20\'}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','Chrome46.0','218.18.170.47','2016-10-22 14:20:40'),(18,'{Action:\'QueryCustomers\',BizObj:\"{Keywords:\'\',Page:\'1\',PageNum:\'20\'}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%2C%7B%20key%3A%20%27clientOpenTime%27%2C%20value%3A%20%271477117319191%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','Chrome46.0','218.18.170.47','2016-10-22 14:22:03'),(19,'{Action:\'QueryCustomers\',BizObj:\"{Keywords:\'\',Page:\'1\',PageNum:\'20\'}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','InternetExplorer11.0','127.0.0.1','2016-10-22 14:22:24'),(20,'{Action:\'QueryCustomers\',BizObj:\"{Keywords:\'\',Page:\'1\',PageNum:\'20\'}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','InternetExplorer11.0','127.0.0.1','2016-10-22 14:23:04'),(21,'{Action:\'QueryCustomers\',BizObj:\"{Keywords:\'\',Page:\'1\',PageNum:\'20\'}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%2C%7B%20key%3A%20%27clientOpenTime%27%2C%20value%3A%20%271477117319191%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','Chrome46.0','218.18.170.47','2016-10-22 14:23:13'),(22,'{Action:\'QueryCustomers\',BizObj:\"{Keywords:\'\',Page:\'1\',PageNum:\'20\'}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%2C%7B%20key%3A%20%27clientOpenTime%27%2C%20value%3A%20%271477117319191%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','Chrome46.0','218.18.170.47','2016-10-22 14:23:22'),(23,'{Action:\'QueryCustomers\',BizObj:\"{Keywords:\'\',Page:\'1\',PageNum:\'20\'}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%2C%7B%20key%3A%20%27clientOpenTime%27%2C%20value%3A%20%271477117319191%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','Chrome46.0','218.18.170.47','2016-10-22 14:23:28'),(24,'{Action:\'QueryCustomers\',BizObj:\"{Keywords:\'\',Page:\'1\',PageNum:\'20\'}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%2C%7B%20key%3A%20%27clientOpenTime%27%2C%20value%3A%20%271477117319191%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','Chrome46.0','218.18.170.47','2016-10-22 14:23:34'),(25,'{Action:\'QueryCustomers\',BizObj:\"{Keywords:\'\',Page:\'1\',PageNum:\'20\'}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','InternetExplorer11.0','127.0.0.1','2016-10-22 14:24:19'),(26,'{Action:\'QueryCustomers\',BizObj:\"{Keywords:\'\',Page:\'1\',PageNum:\'20\'}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%2C%7B%20key%3A%20%27clientOpenTime%27%2C%20value%3A%20%271477117319191%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','Chrome46.0','218.18.170.47','2016-10-22 14:25:16'),(27,'{Action:\'QueryCustomers\',BizObj:\"{Keywords:\'\',Page:\'1\',PageNum:\'20\'}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','InternetExplorer11.0','127.0.0.1','2016-10-22 14:25:37'),(28,'{Action:\'QueryCustomers\',BizObj:\"{Keywords:\'\',Page:\'1\',PageNum:\'20\'}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','InternetExplorer11.0','127.0.0.1','2016-10-22 14:27:33'),(29,'{Action:\'QueryCustomers\',BizObj:\"{Keywords:\'\',Page:\'1\',PageNum:\'20\'}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','InternetExplorer11.0','127.0.0.1','2016-10-22 14:28:30'),(30,'{Action:\'QueryCustomers\',BizObj:\"{Keywords:\'\',Page:\'1\',PageNum:\'20\'}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%2C%7B%20key%3A%20%27clientOpenTime%27%2C%20value%3A%20%271477117319191%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','Chrome46.0','218.18.170.47','2016-10-22 14:33:14'),(31,'{Action:\'QueryCustomers\',BizObj:\"{Keywords:\'\',Page:\'1\',PageNum:\'20\'}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','Chrome46.0','218.18.170.47','2016-10-22 14:33:27'),(32,'{Action:\'QueryCustomers\',BizObj:\"{Keywords:\'\',Page:\'1\',PageNum:\'20\'}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','Chrome46.0','218.18.170.47','2016-10-22 14:34:15'),(33,'{Action:\'QueryCustomers\',BizObj:\"{Keywords:\'\',Page:\'1\',PageNum:\'20\'}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','Chrome46.0','218.18.170.47','2016-10-22 14:34:33'),(34,'{Action:\'DeleteCustomer\',BizObj:\"{Customer_Id:\'2\'}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%5D%20%7D','mscorlib:Could not find specified column in results: bizlic_url','Chrome46.0','218.18.170.47','2016-10-22 14:35:56'),(35,'{Action:\'ModifyCustomer\',BizObj:\"{Customer_Id:\'4\',CustomerGroup_Id:\'1\',CustName:\'xxxxx\',Email:\'xxx\',Tel:\'\',GlobalArea_Id:\'122\',GlobalAreaName:\'美国\',ContactInfo:\'\',Remark:\'\',RvAddresses:[]}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%2C%7B%20key%3A%20%27clientOpenTime%27%2C%20value%3A%20%271477118404988%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','Chrome46.0','218.18.170.47','2016-10-22 14:40:06'),(36,'{Action:\'ModifyCustomer\',BizObj:\"{Customer_Id:\'4\',CustomerGroup_Id:\'1\',CustName:\'xxxxx\',Email:\'xxx\',Tel:\'\',GlobalArea_Id:\'122\',GlobalAreaName:\'美国\',ContactInfo:\'\',Remark:\'\',RvAddresses:[]}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%2C%7B%20key%3A%20%27clientOpenTime%27%2C%20value%3A%20%271477118404988%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','Chrome46.0','218.18.170.47','2016-10-22 14:40:16'),(37,'{Action:\'ModifyCustomer\',BizObj:\"{Customer_Id:\'5\',CustomerGroup_Id:\'1\',CustName:\'hxxx\',Email:\'\',Tel:\'\',GlobalArea_Id:\'122\',GlobalAreaName:\'美国\',ContactInfo:\'\',Remark:\'\',RvAddresses:[]}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%2C%7B%20key%3A%20%27clientOpenTime%27%2C%20value%3A%20%271477118404988%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','Chrome46.0','218.18.170.47','2016-10-22 14:43:26'),(38,'{Action:\'ModifyCustomer\',BizObj:\"{Customer_Id:\'5\',CustomerGroup_Id:\'1\',CustName:\'hxxx\',Email:\'\',Tel:\'\',GlobalArea_Id:\'122\',GlobalAreaName:\'美国\',ContactInfo:\'\',Remark:\'\',RvAddresses:[]}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%2C%7B%20key%3A%20%27clientOpenTime%27%2C%20value%3A%20%271477118404988%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','Chrome46.0','218.18.170.47','2016-10-22 14:43:32'),(39,'{Action:\'ModifyCustomer\',BizObj:\"{Customer_Id:\'5\',CustomerGroup_Id:\'1\',CustName:\'hxxx\',Email:\'\',Tel:\'\',GlobalArea_Id:\'122\',GlobalAreaName:\'美国\',ContactInfo:\'\',Remark:\'\',RvAddresses:[]}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%2C%7B%20key%3A%20%27clientOpenTime%27%2C%20value%3A%20%271477118404988%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','Chrome46.0','218.18.170.47','2016-10-22 14:43:53'),(40,'{Action:\'ModifyCustomer\',BizObj:\"{Customer_Id:\'5\',CustomerGroup_Id:\'1\',CustName:\'hxxx\',Email:\'\',Tel:\'\',GlobalArea_Id:\'122\',GlobalAreaName:\'美国\',ContactInfo:\'\',Remark:\'\',SalePlatform_Id:\'8\',RvAddresses:[]}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%2C%7B%20key%3A%20%27clientOpenTime%27%2C%20value%3A%20%271477118404988%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','Chrome46.0','218.18.170.47','2016-10-22 14:45:57'),(41,'{Action:\'ModifyCustomer\',BizObj:\"{Customer_Id:\'4\',CustomerGroup_Id:\'1\',CustName:\'xxxxx\',Email:\'xxx\',Tel:\'\',GlobalArea_Id:\'122\',GlobalAreaName:\'美国\',ContactInfo:\'\',Remark:\'\',SalePlatform_Id:\'8\',RvAddresses:[]}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%2C%7B%20key%3A%20%27clientOpenTime%27%2C%20value%3A%20%271477118404988%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','Chrome46.0','218.18.170.47','2016-10-22 14:46:05'),(42,'{Action:\'ModifyCustomer\',BizObj:\"{Customer_Id:\'6\',CustomerGroup_Id:\'1\',CustName:\'xxxxxsd\',Email:\'\',Tel:\'dsd\',GlobalArea_Id:\'122\',GlobalAreaName:\'美国\',ContactInfo:\'\',Remark:\'\',SalePlatform_Id:\'8\',RvAddresses:[]}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%2C%7B%20key%3A%20%27clientOpenTime%27%2C%20value%3A%20%271477118404988%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','Chrome46.0','218.18.170.47','2016-10-22 14:46:24'),(43,'{Action:\'QuerySalePlatforms\'}','','ArkEC.CoreCom.Runtime:未将对象引用设置到对象的实例。','IE9.0','101.226.89.120','2016-10-22 14:47:47'),(44,'{Action:\'ReadCustomer\',BizObj:\"{Customer_Id:\'7\'}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%2C%7B%20key%3A%20%27clientOpenTime%27%2C%20value%3A%20%271477118679588%27%20%7D%5D%20%7D','mscorlib:Could not find specified column in results: Contract_Id','Chrome50.0','218.18.170.47','2016-10-22 14:49:13'),(45,'{Action:\'ReadCustomer\',BizObj:\"{Customer_Id:\'7\'}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%2C%7B%20key%3A%20%27clientOpenTime%27%2C%20value%3A%20%271477118679588%27%20%7D%5D%20%7D','mscorlib:Could not find specified column in results: Contract_Id','Chrome50.0','218.18.170.47','2016-10-22 14:49:21'),(46,'{Action:\'ReadCustomer\',BizObj:\"{Customer_Id:\'7\'}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%2C%7B%20key%3A%20%27clientOpenTime%27%2C%20value%3A%20%271477118404988%27%20%7D%5D%20%7D','mscorlib:Could not find specified column in results: Contract_Id','Chrome46.0','218.18.170.47','2016-10-22 14:50:56'),(47,'{Action:\'QuerySalePlatforms\'}','','ArkEC.SEMs.Business:未将对象引用设置到对象的实例。','Chrome45.0','101.226.68.213','2016-10-22 14:50:57'),(48,'{Action:\'ModifyCustomer\',BizObj:\"{Customer_Id:\'6\',CustomerGroup_Id:\'1\',CustName:\'xxxxxsd\',Email:\'\',Tel:\'dsd\',GlobalArea_Id:\'122\',GlobalAreaName:\'美国\',ContactInfo:\'\',Remark:\'\',SalePlatform_Id:\'8\',RvAddresses:[]}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%2C%7B%20key%3A%20%27clientOpenTime%27%2C%20value%3A%20%271477118404988%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','Chrome46.0','218.18.170.47','2016-10-22 14:53:00'),(49,'{Action:\'ReadCustomer\',BizObj:\"{Customer_Id:\'7\'}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%2C%7B%20key%3A%20%27clientOpenTime%27%2C%20value%3A%20%271477118404988%27%20%7D%5D%20%7D','mscorlib:Could not find specified column in results: Contract_Id','Chrome46.0','218.18.170.47','2016-10-22 14:56:06'),(50,'{Action:\'ReadCustomer\',BizObj:\"{Customer_Id:\'7\'}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%2C%7B%20key%3A%20%27clientOpenTime%27%2C%20value%3A%20%271477118404988%27%20%7D%5D%20%7D','mscorlib:Could not find specified column in results: Contract_Id','Chrome46.0','218.18.170.47','2016-10-22 14:59:23'),(51,'{Action:\'ReadCustomer\',BizObj:\"{Customer_Id:\'7\'}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%2C%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27clientOpenTime%27%2C%20value%3A%20%271477119740915%27%20%7D%5D%20%7D','mscorlib:Could not find specified column in results: Contract_Id','Chrome53.0','::1','2016-10-22 15:02:22'),(52,'{Action:\'ReadCustomer\',BizObj:\"{Customer_Id:\'7\'}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%2C%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27clientOpenTime%27%2C%20value%3A%20%271477119740915%27%20%7D%5D%20%7D','mscorlib:Could not find specified column in results: Contract_Id','Chrome53.0','::1','2016-10-22 15:03:53'),(53,'{Action:\'ModifyCustomer\',BizObj:\"{Customer_Id:\'7\',CustomerGroup_Id:\'1\',CustName:\'黄宝欢\',Email:\'892163315@qq.com\',Tel:\'18826241586\',GlobalArea_Id:\'14\',GlobalAreaName:\'中国\',ContactInfo:\'\',Remark:\'\',SalePlatform_Id:\'8\',RvAddresses:[{Customer_RvAddress_Id:\'4\',Customer_Id:\'7\',RvSeq:\'1\',RvFullName:\'黄宝欢\',RvTel:\'18826241586\',GlobalArea_Id:\'14\',RvProvince:\'\',RvCity:\'\',RvPostCode:\'\',RvAddress_1:\'深圳市南山区深南大道10128号\',RvAddress_2:\'数字文化产业基地东塔楼2403号\',OtherProps:{GlobalAreaName:\'中国\'},GlobalAreaName:\'中国\',_Seq:\'1\'}]}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%2C%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27clientOpenTime%27%2C%20value%3A%20%271477120429188%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','Chrome53.0','58.251.156.85','2016-10-22 15:14:29'),(54,'{Action:\'ModifyCustomer\',BizObj:\"{Customer_Id:\'7\',CustomerGroup_Id:\'1\',CustName:\'黄宝欢\',Email:\'892163315@qq.com\',Tel:\'18826241586\',GlobalArea_Id:\'14\',GlobalAreaName:\'中国\',ContactInfo:\'\',Remark:\'\',SalePlatform_Id:\'8\',RvAddresses:[{Customer_RvAddress_Id:\'4\',Customer_Id:\'7\',RvSeq:\'1\',RvFullName:\'黄宝欢\',RvTel:\'18826241586\',GlobalArea_Id:\'14\',RvProvince:\'\',RvCity:\'\',RvPostCode:\'\',RvAddress_1:\'深圳市南山区深南大道10128号\',RvAddress_2:\'数字文化产业基地东塔楼2403号\',OtherProps:{GlobalAreaName:\'中国\'},GlobalAreaName:\'中国\',_Seq:\'1\'}]}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%2C%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27clientOpenTime%27%2C%20value%3A%20%271477119917104%27%20%7D%5D%20%7D','mscorlib:Object reference not set to an instance of an object.','Chrome53.0','::1','2016-10-22 15:14:48'),(55,'{Action:\'ModifyCustomer\',BizObj:\"{Customer_Id:\'6\',CustomerGroup_Id:\'1\',CustName:\'xxxxxsd\',Email:\'\',Tel:\'dsd\',GlobalArea_Id:\'122\',GlobalAreaName:\'美国\',ContactInfo:\'\',Remark:\'\',SalePlatform_Id:\'8\',RvAddresses:[]}\"}','UserSetting:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27lanuage%27%2C%20value%3A%20%27%u7B80%u4F53%u4E2D%u6587%21zh-cn%27%20%7D%2C%7B%20key%3A%20%27loginemail%27%2C%20value%3A%20%27admin%27%20%7D%5D%20%7D,RunningContext:%7B%20struct%3A%20%27dictionary%27%2C%20items%3A%20%5B%7B%20key%3A%20%27keycontext%27%2C%20value%3A%20%271-kg%27%20%7D%2C%7B%20key%3A%20%27usertoken%27%2C%20value%3A%20%2792EBDC74CF8C2422%27%20%7D%2C%7B%20key%3A%20%27clientOpenTime%27%2C%20value%3A%20%271477118404988%27%20%7D%5D%20%7D','mscorlib:未将对象引用设置到对象的实例。','Chrome46.0','218.18.170.47','2016-10-22 15:18:09'),(56,'{Action:\'QueryRegions\'}','','ArkEC.CoreCom.Runtime:未将对象引用设置到对象的实例。','Chrome45.0','101.226.68.213','2016-10-22 18:00:40'),(57,'{Action:\'QuerySalePlatforms\'}','','ArkEC.CoreCom.Runtime:未将对象引用设置到对象的实例。','IE9.0','113.123.37.81','2016-10-25 15:25:04'),(58,'{Action:\'QueryRegions\'}','','ArkEC.CoreCom.Runtime:未将对象引用设置到对象的实例。','Chrome45.0','180.153.206.23','2016-10-25 21:55:53'),(59,'{Action:\'QueryCountries\'}','','ArkEC.CoreCom.Runtime:未将对象引用设置到对象的实例。','IE9.0','101.226.51.228','2016-10-25 21:55:55'),(60,'{Action:\'QuerySalePlatforms\'}','','ArkEC.CoreCom.Runtime:未将对象引用设置到对象的实例。','Chrome45.0','101.226.89.117','2016-10-25 21:56:03');
/*!40000 ALTER TABLE `syserror` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `syskeyparam`
--

DROP TABLE IF EXISTS `syskeyparam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `syskeyparam` (
  `SysKeyParam_Id` int(11) NOT NULL,
  `SysLanguage_Ids` varchar(50) DEFAULT NULL,
  `SysLanguage_Id` int(11) DEFAULT NULL,
  `SysWeightUnit_Id` int(11) DEFAULT NULL,
  PRIMARY KEY (`SysKeyParam_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `syskeyparam`
--

LOCK TABLES `syskeyparam` WRITE;
/*!40000 ALTER TABLE `syskeyparam` DISABLE KEYS */;
INSERT INTO `syskeyparam` VALUES (1,'1,3',1,1);
/*!40000 ALTER TABLE `syskeyparam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `syslanguage`
--

DROP TABLE IF EXISTS `syslanguage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `syslanguage` (
  `SysLanguage_Id` int(11) NOT NULL,
  `LRCode` varchar(10) DEFAULT NULL,
  `LRName` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`SysLanguage_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `syslanguage`
--

LOCK TABLES `syslanguage` WRITE;
/*!40000 ALTER TABLE `syslanguage` DISABLE KEYS */;
INSERT INTO `syslanguage` VALUES (1,'zh-cn','简体中文'),(2,'zh-hk','繁体中文'),(3,'en-us','English'),(4,'fr','fran?aise'),(5,'ja','日本語の言語'),(6,'de','Deutsch'),(7,'ko','???'),(8,'es','espa?ol'),(9,'it','italiano'),(10,'ru','русский');
/*!40000 ALTER TABLE `syslanguage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sysmenu`
--

DROP TABLE IF EXISTS `sysmenu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sysmenu` (
  `SysMenu_Id` int(11) NOT NULL,
  `ParentMenu_Id` int(11) DEFAULT NULL,
  `MenuName` varchar(50) DEFAULT NULL,
  `MenuUrl` varchar(255) DEFAULT NULL,
  `Remark` varchar(50) DEFAULT NULL,
  `Seq` int(11) DEFAULT NULL,
  `IsControl` int(11) DEFAULT NULL,
  PRIMARY KEY (`SysMenu_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sysmenu`
--

LOCK TABLES `sysmenu` WRITE;
/*!40000 ALTER TABLE `sysmenu` DISABLE KEYS */;
INSERT INTO `sysmenu` VALUES (1,0,'M0002','','商品&服务',10,1),(2,1,'M0010','bzm/bizui/prodcategory.htm','商品分类',14,1),(3,1,'M0011','bzm/bizui/brand.htm','品牌',13,1),(4,1,'M0012','bzm/bizui/product.htm','商品信息',11,1),(5,1,'M0015','bzm/bizui/prodproperty.htm','商品属性',15,1),(6,0,'M0003',NULL,'采购管理',30,1),(7,20,'M0038','bzm/bizui/saleplatform.htm','销售平台',65,1),(8,1,'M0018','bzm/bizui/salestrategy.htm','站点商品信息',11,1),(9,0,'M0005','','销售管理',20,1),(10,9,'M0025','bzm/bizui/saleorder.htm','销售订单处理',22,1),(11,9,'M0029','bzm/bizui/customer.htm','客户信息',21,1),(12,0,'M0004','','物流仓储管理',40,1),(13,12,'C0274','bzm/bizui/inventory.htm','商品仓储',42,1),(18,20,'M0034','bzm/bizui/syscurrency.htm','货币及汇率',63,1),(19,20,'M0043','bzm/bizui/globalarea.htm','全球区域',64,1),(20,0,'M0008','','系统设置',60,1),(21,20,'M0037','bzm/bizui/syskeyparam.htm','关键运营参数',61,1),(23,20,'M0044','bzm/bizui/sysuser.htm','系统用户',62,1),(25,1,'M0045','bzm/bizui/expressservice.htm','站点配送服务',12,1),(26,0,'M0046',NULL,'财务管理',50,1),(27,26,'M0047','bzm/bizui/performancereport.htm','财务统计分析',51,1),(28,26,'M0048','bzm/bizui/managingcost.htm','成本科目',54,1),(29,26,'M0049','bzm/bizui/accountinout.htm','财务收入支出',52,1),(30,26,'M0050','bzm/bizui/fundaccount.htm','资金账号',53,1),(32,12,'M0053','bzm/bizui/logisticssolution.htm','物流方案',43,1),(33,6,'C1593','bzm/bizui/purchaseprice.htm','供应商&询价',32,1),(34,6,'M0055','bzm/bizui/purchaseorder.htm','商品采购处理',31,1),(36,12,'C1246','bzm/bizui/expressorder.htm','物流配送处理',41,1),(37,9,'C1273','bzm/bizui/aftersale.htm','售后服务',23,1);
/*!40000 ALTER TABLE `sysmenu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sysmenuauz`
--

DROP TABLE IF EXISTS `sysmenuauz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sysmenuauz` (
  `SysMenuAUZ_Id` int(11) NOT NULL,
  `SysUser_Id` int(11) DEFAULT NULL,
  `SysRole_Id` int(11) DEFAULT NULL,
  `SysMenu_Id` int(11) DEFAULT NULL,
  PRIMARY KEY (`SysMenuAUZ_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sysmenuauz`
--

LOCK TABLES `sysmenuauz` WRITE;
/*!40000 ALTER TABLE `sysmenuauz` DISABLE KEYS */;
INSERT INTO `sysmenuauz` VALUES (1,NULL,2,1),(2,NULL,2,8);
/*!40000 ALTER TABLE `sysmenuauz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sysprinttemplate`
--

DROP TABLE IF EXISTS `sysprinttemplate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sysprinttemplate` (
  `SysPrintTemplate_Id` int(11) NOT NULL,
  `Content` text,
  PRIMARY KEY (`SysPrintTemplate_Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sysprinttemplate`
--

LOCK TABLES `sysprinttemplate` WRITE;
/*!40000 ALTER TABLE `sysprinttemplate` DISABLE KEYS */;
/*!40000 ALTER TABLE `sysprinttemplate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sysprodauz`
--

DROP TABLE IF EXISTS `sysprodauz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sysprodauz` (
  `SysProdAuz_id` int(11) NOT NULL,
  `ProdCategory_Id` int(11) DEFAULT NULL,
  `SysRole_Id` int(11) DEFAULT NULL,
  `SysUser_Id` int(11) DEFAULT NULL,
  PRIMARY KEY (`SysProdAuz_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sysprodauz`
--

LOCK TABLES `sysprodauz` WRITE;
/*!40000 ALTER TABLE `sysprodauz` DISABLE KEYS */;
/*!40000 ALTER TABLE `sysprodauz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sysresponsetask`
--

DROP TABLE IF EXISTS `sysresponsetask`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sysresponsetask` (
  `ResponseText` text,
  `SysResponseTask_Id` int(11) NOT NULL,
  `User_Id` int(11) DEFAULT NULL,
  `Action` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`SysResponseTask_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sysresponsetask`
--

LOCK TABLES `sysresponsetask` WRITE;
/*!40000 ALTER TABLE `sysresponsetask` DISABLE KEYS */;
/*!40000 ALTER TABLE `sysresponsetask` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sysrestablesymbol`
--

DROP TABLE IF EXISTS `sysrestablesymbol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sysrestablesymbol` (
  `ID` int(11) NOT NULL,
  `TableName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sysrestablesymbol`
--

LOCK TABLES `sysrestablesymbol` WRITE;
/*!40000 ALTER TABLE `sysrestablesymbol` DISABLE KEYS */;
/*!40000 ALTER TABLE `sysrestablesymbol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sysrole`
--

DROP TABLE IF EXISTS `sysrole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sysrole` (
  `SysRole_Id` int(11) NOT NULL,
  `Seq` int(11) DEFAULT NULL,
  PRIMARY KEY (`SysRole_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sysrole`
--

LOCK TABLES `sysrole` WRITE;
/*!40000 ALTER TABLE `sysrole` DISABLE KEYS */;
INSERT INTO `sysrole` VALUES (1,1),(2,2);
/*!40000 ALTER TABLE `sysrole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sysrole_res`
--

DROP TABLE IF EXISTS `sysrole_res`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sysrole_res` (
  `SysRole_Res_Id` int(11) NOT NULL,
  `SysRole_Id` int(11) DEFAULT NULL,
  `LRCode` varchar(10) DEFAULT NULL,
  `RoleName` varchar(50) DEFAULT NULL,
  `Remark` text,
  PRIMARY KEY (`SysRole_Res_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sysrole_res`
--

LOCK TABLES `sysrole_res` WRITE;
/*!40000 ALTER TABLE `sysrole_res` DISABLE KEYS */;
INSERT INTO `sysrole_res` VALUES (1,1,'zh-cn','超级管理员','拥有系统的最高权限，可对所有数据进行操作'),(2,1,'en-us','Super Admin','Has the highest authority system can operate on all the data'),(3,2,'zh-cn','第三方人员','非本公司人员，需要向其共享部分商品数据'),(4,2,'en-us','Other','.............');
/*!40000 ALTER TABLE `sysrole_res` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sysroleauz`
--

DROP TABLE IF EXISTS `sysroleauz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sysroleauz` (
  `SysRoleAUZ_Id` int(11) NOT NULL,
  `SysUser_Id` int(11) DEFAULT NULL,
  `SysRole_Id` int(11) DEFAULT NULL,
  PRIMARY KEY (`SysRoleAUZ_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sysroleauz`
--

LOCK TABLES `sysroleauz` WRITE;
/*!40000 ALTER TABLE `sysroleauz` DISABLE KEYS */;
/*!40000 ALTER TABLE `sysroleauz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `syssymbol_res`
--

DROP TABLE IF EXISTS `syssymbol_res`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `syssymbol_res` (
  `SysSymbol_Res_Id` int(11) NOT NULL,
  `KeyType` varchar(50) DEFAULT NULL,
  `KeyCode` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`SysSymbol_Res_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `syssymbol_res`
--

LOCK TABLES `syssymbol_res` WRITE;
/*!40000 ALTER TABLE `syssymbol_res` DISABLE KEYS */;
INSERT INTO `syssymbol_res` VALUES (1,'common_res','C0043'),(2,'common_res','C0044'),(3,'common_res','C0045'),(4,'common_res','C0046'),(5,'common_res','C0047'),(6,'common_res','C0048'),(7,'common_res','C0050'),(8,'common_res','C0051'),(9,'common_res','C0052'),(10,'common_res','C0053'),(11,'common_res','C0054'),(12,'common_res','C0055'),(13,'common_res','C0056'),(14,'common_res','C0057'),(15,'common_res','C0058'),(16,'common_res','C0059'),(17,'common_res','C0060'),(18,'common_res','C0001'),(19,'common_res','C0002'),(20,'common_res','C0003'),(21,'common_res','C0004'),(22,'common_res','C0005'),(23,'common_res','C0007'),(24,'common_res','C0014'),(25,'common_res','C0019'),(26,'common_res','C0023'),(27,'common_res','C0024'),(28,'common_res','C0037'),(29,'common_res','C0038'),(30,'common_res','C0039'),(31,'common_res','C0040'),(32,'common_res','C0041'),(33,'common_res','C0042'),(34,'common_res','C0049'),(35,'common_res','C0061'),(36,'common_res','C0062'),(37,'common_res','C0073'),(38,'common_res','C0076'),(39,'common_res','C0077'),(40,'common_res','C0078'),(41,'common_res','C0079'),(42,'common_res','C0088'),(43,'common_res','C0099'),(44,'common_res','C0103'),(45,'common_res','C0104'),(46,'common_res','C0108'),(47,'common_res','C0109'),(48,'common_res','C0111'),(49,'common_res','C0112'),(50,'common_res','C0113'),(51,'common_res','C0114'),(52,'common_res','C0115'),(53,'common_res','C0116'),(54,'common_res','C0117'),(55,'common_res','C0118'),(56,'common_res','C0142'),(57,'common_res','C0146'),(58,'common_res','M0001'),(59,'common_res','M0002'),(60,'common_res','M0003'),(61,'common_res','M0004'),(62,'common_res','M0005'),(63,'common_res','M0006'),(64,'common_res','M0007'),(65,'common_res','M0008'),(66,'common_res','M0010'),(67,'common_res','M0011'),(68,'common_res','M0012'),(69,'common_res','M0013'),(70,'common_res','M0014'),(71,'common_res','M0015'),(72,'common_res','M0016'),(73,'common_res','M0017'),(74,'common_res','M0018'),(75,'common_res','M0019'),(76,'common_res','M0020'),(77,'common_res','M0021'),(78,'common_res','M0022'),(79,'common_res','M0023'),(80,'common_res','M0024'),(81,'common_res','M0025'),(82,'common_res','M0026'),(83,'common_res','M0027'),(84,'common_res','M0028'),(85,'common_res','M0029'),(86,'common_res','M0030'),(88,'common_res','M0032'),(89,'common_res','M0033'),(90,'common_res','M0034'),(91,'common_res','M0035'),(92,'common_res','M0036'),(93,'common_res','M0037'),(94,'common_res','M0038'),(95,'common_res','M0039'),(96,'common_res','M0040'),(97,'common_res','M0041'),(98,'common_res','E0003'),(99,'common_res','C0006'),(100,'common_res','C0007'),(101,'common_res','C0008'),(102,'common_res','C0009'),(103,'common_res','C0010'),(104,'common_res','C0011'),(105,'common_res','C0012'),(106,'common_res','E0001'),(107,'common_res','E0002'),(108,'common_res','C0013'),(109,'common_res','C0015'),(110,'common_res','C0016'),(111,'common_res','C0017'),(112,'common_res','C0018'),(113,'common_res','C0020'),(114,'common_res','C0021'),(115,'common_res','C0022'),(116,'common_res','C0025'),(117,'common_res','C0026'),(118,'common_res','C0027'),(119,'common_res','SysValue_Res'),(120,'common_res','Brand_Res'),(121,'common_res','BrandType_Res'),(122,'common_res','ProdCategory_Res'),(123,'common_res','ProdProperty_Res'),(124,'common_res','PropValue_Res'),(125,'common_res','SysCurrency_Res'),(126,'common_res','C0090'),(127,'common_res','C0091'),(128,'common_res','C0092'),(129,'common_res','C0093'),(130,'common_res','C0094'),(131,'common_res','C0095'),(132,'common_res','C0096'),(133,'common_res','C0097'),(134,'common_res','C0098'),(135,'common_res','C0100'),(136,'common_res','C0101'),(137,'common_res','C0102'),(138,'common_res','C0063'),(139,'common_res','C0065'),(140,'common_res','C0066'),(141,'common_res','C0069'),(142,'common_res','C0070'),(143,'common_res','C0071'),(144,'common_res','C0072'),(145,'common_res','C0074'),(146,'common_res','C0075'),(147,'common_res','C0080'),(148,'common_res','C0081'),(149,'common_res','C0082'),(150,'common_res','C0086'),(151,'common_res','C0087'),(152,'common_res','C0089'),(153,'common_res','C0105'),(154,'common_res','C0106'),(155,'common_res','C0107'),(156,'common_res','C0110'),(157,'common_res','C0119'),(161,'common_res','C0123'),(162,'common_res','C0124'),(163,'common_res','C0125'),(164,'common_res','C0126'),(166,'common_res','C0128'),(167,'common_res','C0129'),(168,'common_res','C0130'),(169,'common_res','C0131'),(170,'common_res','C0132'),(171,'common_res','C0133'),(172,'common_res','C0134'),(173,'common_res','C0135'),(174,'common_res','C0136'),(175,'common_res','C0137'),(176,'common_res','C0138'),(177,'common_res','C0139'),(178,'common_res','C0141'),(179,'common_res','C0143'),(180,'common_res','C0144'),(181,'common_res','C0145'),(182,'common_res','C0147'),(183,'common_res','C0148'),(184,'common_res','C0028'),(185,'common_res','C0031'),(186,'common_res','C0032'),(187,'common_res','C0033'),(188,'common_res','C0034'),(189,'common_res','C0036'),(191,'common_res','C0044'),(192,'common_res','C0045'),(193,'common_res','C0046'),(194,'common_res','C0047'),(195,'common_res','C0048'),(196,'common_res','C0050'),(197,'common_res','C0051'),(198,'common_res','C0052'),(199,'common_res','C0053'),(200,'common_res','C0054'),(201,'common_res','C0055'),(202,'common_res','C0056'),(203,'common_res','C0057'),(204,'common_res','C0058'),(205,'common_res','C0059'),(206,'common_res','C0060'),(207,'common_res','C0001'),(208,'common_res','C0002'),(209,'common_res','C0003'),(210,'common_res','C0004'),(211,'common_res','C0005'),(212,'common_res','C0007'),(213,'common_res','C0014'),(214,'common_res','C0019'),(215,'common_res','C0023'),(216,'common_res','C0024'),(217,'common_res','C0037'),(218,'common_res','C0038'),(219,'common_res','C0039'),(220,'common_res','C0040'),(221,'common_res','C0041'),(222,'common_res','C0042'),(223,'common_res','C0049'),(224,'common_res','C0061'),(225,'common_res','C0062'),(226,'common_res','C0073'),(227,'common_res','C0076'),(228,'common_res','C0077'),(229,'common_res','C0078'),(230,'common_res','C0079'),(231,'common_res','C0088'),(232,'common_res','C0099'),(233,'common_res','C0103'),(234,'common_res','C0104'),(235,'common_res','C0108'),(236,'common_res','C0109'),(237,'common_res','C0111'),(238,'common_res','C0112'),(239,'common_res','C0113'),(240,'common_res','C0114'),(241,'common_res','C0115'),(242,'common_res','C0116'),(243,'common_res','C0117'),(244,'common_res','C0118'),(245,'common_res','C0142'),(247,'common_res','M0001'),(248,'common_res','M0002'),(249,'common_res','M0003'),(250,'common_res','M0004'),(251,'common_res','M0005'),(252,'common_res','M0006'),(253,'common_res','M0007'),(254,'common_res','M0008'),(255,'common_res','M0010'),(256,'common_res','M0011'),(257,'common_res','M0012'),(258,'common_res','M0013'),(259,'common_res','M0014'),(260,'common_res','M0015'),(261,'common_res','M0016'),(262,'common_res','M0017'),(263,'common_res','M0018'),(264,'common_res','M0019'),(265,'common_res','M0020'),(266,'common_res','M0021'),(267,'common_res','M0022'),(268,'common_res','M0023'),(269,'common_res','M0024'),(270,'common_res','M0025'),(271,'common_res','M0026'),(272,'common_res','M0027'),(273,'common_res','M0028'),(274,'common_res','M0029'),(275,'common_res','M0030'),(276,'common_res','M0031'),(277,'common_res','M0032'),(278,'common_res','M0033'),(279,'common_res','M0034'),(280,'common_res','M0035'),(281,'common_res','M0036'),(282,'common_res','M0037'),(284,'common_res','M0039'),(285,'common_res','M0040'),(286,'common_res','M0041'),(287,'common_res','E0003'),(288,'common_res','C0006'),(289,'common_res','C0007'),(290,'common_res','C0008'),(291,'common_res','C0009'),(292,'common_res','C0010'),(293,'common_res','C0011'),(294,'common_res','C0012'),(295,'common_res','E0001'),(296,'common_res','E0002'),(297,'common_res','C0013'),(298,'common_res','C0015'),(299,'common_res','C0016'),(300,'common_res','C0017'),(301,'common_res','C0018'),(302,'common_res','C0020'),(303,'common_res','C0021'),(304,'common_res','C0022'),(305,'common_res','C0025'),(306,'common_res','C0026'),(307,'common_res','C0027'),(308,'common_res','SysValue_Res'),(309,'common_res','Brand_Res'),(310,'common_res','BrandType_Res'),(311,'common_res','ProdCategory_Res'),(312,'common_res','ProdProperty_Res'),(313,'common_res','PropValue_Res'),(314,'common_res','SysCurrency_Res'),(315,'common_res','C0090'),(316,'common_res','C0091'),(317,'common_res','C0092'),(318,'common_res','C0093'),(319,'common_res','C0094'),(322,'common_res','C0097'),(323,'common_res','C0098'),(324,'common_res','C0100'),(325,'common_res','C0101'),(326,'common_res','C0102'),(327,'common_res','C0063'),(328,'common_res','C0065'),(329,'common_res','C0066'),(330,'common_res','C0069'),(331,'common_res','C0070'),(332,'common_res','C0071'),(333,'common_res','C0072'),(334,'common_res','C0074'),(335,'common_res','C0075'),(336,'common_res','C0080'),(337,'common_res','C0081'),(338,'common_res','C0082'),(339,'common_res','C0086'),(340,'common_res','C0087'),(341,'common_res','C0089'),(342,'common_res','C0105'),(343,'common_res','C0106'),(344,'common_res','C0107'),(345,'common_res','C0110'),(346,'common_res','C0119'),(347,'common_res','C0120'),(348,'common_res','C0121'),(349,'common_res','C0122'),(350,'common_res','C0123'),(351,'common_res','C0124'),(352,'common_res','C0125'),(353,'common_res','C0126'),(354,'common_res','C0127'),(355,'common_res','C0128'),(356,'common_res','C0129'),(357,'common_res','C0130'),(358,'common_res','C0131'),(359,'common_res','C0132'),(360,'common_res','C0133'),(361,'common_res','C0134'),(362,'common_res','C0135'),(363,'common_res','C0136'),(364,'common_res','C0137'),(365,'common_res','C0138'),(366,'common_res','C0139'),(367,'common_res','C0141'),(368,'common_res','C0143'),(369,'common_res','C0144'),(370,'common_res','C0145'),(371,'common_res','C0147'),(372,'common_res','C0148'),(373,'common_res','C0028'),(374,'common_res','C0031'),(375,'common_res','C0032'),(376,'common_res','C0033'),(377,'common_res','C0034'),(378,'common_res','C0036'),(379,'common_res','C0149'),(380,'common_res','C0150'),(381,'common_res','C0151'),(382,'common_res','C0152'),(383,'common_res','C0153'),(384,'common_res','C0154'),(385,'common_res','C0155'),(386,'common_res','C0156'),(387,'common_res','C0157'),(388,'common_res','C0158'),(389,'common_res','C0159'),(390,'common_res','C0160'),(391,'common_res','C0161'),(392,'common_res','C0162'),(393,'common_res','C0163'),(394,'common_res','C0164'),(395,'common_res','C0165'),(396,'common_res','C0166'),(397,'common_res','C0167'),(398,'common_res','C0168'),(399,'common_res','C0169'),(400,'common_res','C0170'),(401,'common_res','C0171'),(402,'common_res','C0172'),(403,'common_res','C0173'),(404,'common_res','C0174'),(405,'common_res','C0175'),(406,'common_res','C0090'),(407,'common_res','C0112'),(408,'common_res','C0176'),(409,'common_res','C0177'),(410,'common_res','C0178'),(411,'common_res','C0179'),(412,'common_res','C0180'),(413,'common_res','C0181'),(414,'common_res','C0182'),(415,'common_res','C0183'),(417,'common_res','C0185'),(418,'common_res','C0186'),(419,'common_res','C0187'),(420,'common_res','C0188'),(421,'common_res','C0189'),(422,'common_res','C0190'),(423,'common_res','C0191'),(424,'common_res','C0192'),(425,'common_res','C0193'),(426,'common_res','C0194'),(427,'common_res','C0195'),(428,'common_res','C0196'),(429,'common_res','C0197'),(430,'common_res','C0198'),(431,'common_res','C0199'),(432,'common_res','C0200'),(433,'common_res','C0201'),(434,'common_res','M0042'),(435,'common_res','C0202'),(436,'common_res','C0203'),(437,'common_res','C0204'),(438,'common_res','C0180'),(439,'common_res','C0175'),(440,'common_res','C0090'),(442,'common_res','C0185'),(443,'common_res','C0186'),(444,'common_res','C0187'),(445,'common_res','C0090'),(446,'common_res','C0112'),(447,'common_res','C0196'),(448,'common_res','C0197'),(449,'common_res','C0169'),(450,'common_res','C0173'),(451,'common_res','C0174'),(452,'common_res','C0176'),(453,'common_res','C0182'),(454,'common_res','C0194'),(455,'common_res','C0188'),(456,'common_res','C0171'),(466,'common_res','C0214'),(467,'common_res','C0215'),(468,'common_res','C0216'),(469,'common_res','C0217'),(470,'common_res','C0218'),(471,'common_res','C0219'),(472,'common_res','C0220'),(473,'common_res','C0221'),(480,'common_res','C0131'),(484,'common_res','C0231'),(485,'common_res','C0232'),(486,'common_res','C0233'),(487,'common_res','C0234'),(488,'common_res','C0235'),(489,'common_res','C0236'),(490,'common_res','C0237'),(492,'common_res','C0239'),(493,'common_res','C0240'),(494,'common_res','C0241'),(495,'common_res','C0242'),(496,'common_res','C0243'),(497,'common_res','C0244'),(498,'common_res','C0245'),(499,'common_res','C0189'),(500,'common_res','C0246'),(501,'common_res','C0247'),(502,'common_res','C0248'),(503,'common_res','C0249'),(504,'common_res','C0250'),(505,'common_res','C0251'),(506,'common_res','C0252'),(507,'common_res','C0253'),(508,'common_res','C0254'),(509,'common_res','C0255'),(510,'common_res','C0256'),(511,'common_res','C0257'),(512,'common_res','C0258'),(513,'common_res','C0259'),(514,'common_res','C0260'),(515,'common_res','C0261'),(516,'common_res','C0262'),(517,'common_res','C0263'),(518,'common_res','C0264'),(519,'common_res','C0265'),(520,'common_res','C0266'),(521,'common_res','C0267'),(522,'common_res','C0268'),(523,'common_res','C0269'),(524,'common_res','C0270'),(525,'common_res','C0271'),(526,'common_res','C0272'),(527,'common_res','M0043'),(528,'common_res','C0273'),(529,'common_res','C0274'),(530,'common_res','C0275'),(531,'common_res','C0276'),(532,'common_res','C0277'),(533,'common_res','C0278'),(534,'common_res','C0279'),(535,'common_res','C0280'),(536,'common_res','C0281'),(537,'common_res','C0282'),(538,'common_res','C0283'),(539,'common_res','C0284'),(540,'common_res','C0285'),(541,'common_res','C0286'),(542,'common_res','C0287'),(543,'common_res','C0288'),(544,'common_res','C0289'),(545,'common_res','C0290'),(546,'common_res','C0291'),(547,'common_res','C0292'),(548,'common_res','C0293'),(549,'common_res','C0294'),(550,'common_res','C0295'),(551,'common_res','C0296'),(552,'common_res','C0297'),(553,'common_res','C0298'),(554,'common_res','C0299'),(555,'common_res','C0300'),(556,'common_res','C0301'),(557,'common_res','C0302'),(558,'common_res','M0044'),(559,'common_res','C0303'),(560,'common_res','C0304'),(561,'common_res','C0305'),(562,'common_res','C0306'),(563,'common_res','C0307'),(564,'common_res','C0308'),(565,'common_res','C0309'),(566,'common_res','C0310'),(567,'common_res','C0311'),(568,'common_res','C0312'),(569,'common_res','C0313'),(570,'common_res','C0314'),(571,'common_res','C0315'),(572,'common_res','C0316'),(573,'common_res','C0317'),(574,'common_res','C0318'),(575,'common_res','C0319'),(576,'common_res','C0320'),(577,'common_res','C0321'),(578,'common_res','C0322'),(579,'common_res','C0323'),(580,'common_res','C0324'),(581,'common_res','C0325'),(582,'common_res','C0326'),(583,'common_res','C0327'),(584,'common_res','C0328'),(585,'common_res','C0329'),(586,'common_res','C0330'),(587,'common_res','C0331'),(588,'common_res','C0332'),(589,'common_res','C0333'),(590,'common_res','C0334'),(591,'common_res','C0335'),(592,'common_res','C0336'),(593,'common_res','C0337'),(594,'common_res','C0338'),(595,'common_res','C0339'),(596,'common_res','C0340'),(597,'common_res','C0341'),(598,'common_res','C0342'),(599,'common_res','C0343'),(600,'common_res','C0344'),(601,'common_res','C0345'),(602,'common_res','C0346'),(603,'common_res','C0347'),(604,'common_res','C0348'),(605,'common_res','C0349'),(606,'common_res','C0350'),(607,'common_res','C0351'),(608,'common_res','C0352'),(609,'common_res','C0353'),(610,'common_res','C0354'),(611,'common_res','C0355'),(612,'common_res','C0356'),(613,'common_res','C0357'),(614,'common_res','C0358'),(615,'common_res','C0359'),(616,'common_res','C0360'),(617,'common_res','C0361'),(618,'common_res','C0362'),(619,'common_res','C0363'),(620,'common_res','C0364'),(621,'common_res','C0184'),(622,'common_res','C0365'),(623,'common_res','C0366'),(624,'common_res','C0367'),(625,'common_res','C0368'),(626,'common_res','C0369'),(627,'common_res','C0370'),(628,'common_res','C0371'),(629,'common_res','C0372'),(630,'common_res','C0373'),(631,'common_res','C0374'),(632,'common_res','C0375'),(633,'common_res','C0376'),(634,'common_res','C0377'),(635,'common_res','C0378'),(636,'common_res','C0379'),(637,'common_res','C0380'),(638,'common_res','C0381'),(639,'common_res','C0382'),(640,'common_res','C0383'),(641,'common_res','C0384'),(642,'common_res','C0385'),(643,'common_res','C0386'),(644,'common_res','C0387'),(645,'common_res','C0388'),(646,'common_res','C0389'),(647,'common_res','C0390'),(648,'common_res','C0391'),(649,'common_res','C0392'),(650,'common_res','C0393'),(651,'common_res','C0394'),(652,'common_res','C0395'),(653,'common_res','C0396'),(654,'common_res','C0397'),(655,'common_res','C0398'),(656,'common_res','C0399'),(657,'common_res','C0400'),(658,'common_res','C0401'),(659,'common_res','C0402'),(660,'common_res','C0403'),(661,'common_res','C0404'),(662,'common_res','C0405'),(663,'common_res','C0406'),(664,'common_res','C0407'),(665,'common_res','C0408'),(666,'common_res','C0409'),(667,'common_res','C0410'),(668,'common_res','C0411'),(669,'common_res','C0412'),(670,'common_res','C0413'),(671,'common_res','C0414'),(672,'common_res','C0415'),(673,'common_res','C0416'),(674,'common_res','C0417'),(675,'common_res','C0418'),(676,'common_res','C0419'),(677,'common_res','C0420'),(678,'common_res','C0421'),(679,'common_res','C0422'),(680,'common_res','C0423'),(681,'common_res','C0424'),(682,'common_res','C0425'),(683,'common_res','C0426'),(684,'common_res','C0427'),(685,'common_res','C0428'),(686,'common_res','C0429'),(687,'common_res','M0045'),(688,'common_res','C0430'),(689,'common_res','C0431'),(690,'common_res','C0432'),(691,'common_res','C0433'),(692,'common_res','C0434'),(693,'common_res','C0435'),(694,'common_res','C0436'),(695,'common_res','C0437'),(696,'common_res','C0438'),(697,'common_res','C0439'),(698,'common_res','C0440'),(699,'common_res','C0441'),(700,'common_res','C0442'),(701,'common_res','C0443'),(702,'common_res','C0444'),(703,'common_res','C0445'),(704,'common_res','C0446'),(705,'common_res','C0447'),(706,'common_res','C0448'),(707,'common_res','C0449'),(708,'common_res','C0450'),(709,'common_res','C0451'),(710,'common_res','C0452'),(711,'common_res','C0453'),(712,'common_res','C0454'),(713,'common_res','C0455'),(714,'common_res','C0456'),(715,'common_res','C0457'),(716,'common_res','C0458'),(717,'common_res','C0459'),(718,'common_res','C0460'),(719,'common_res','C0461'),(720,'common_res','C0462'),(721,'common_res','C0463'),(722,'common_res','C0464'),(723,'common_res','C0465'),(724,'common_res','C0466'),(725,'common_res','C0467'),(726,'common_res','C0468'),(727,'common_res','C0469'),(728,'common_res','C0470'),(729,'common_res','C0471'),(739,'common_res','C0472'),(740,'common_res','C0473'),(741,'common_res','C0474'),(742,'common_res','C0475'),(743,'common_res','C0476'),(744,'common_res','C0477'),(745,'common_res','C0478'),(746,'common_res','C0479'),(747,'common_res','C0480'),(748,'common_res','C0481'),(749,'common_res','C0482'),(750,'common_res','C0483'),(751,'common_res','C0484'),(752,'common_res','M0046'),(753,'common_res','M0047'),(754,'common_res','M0048'),(755,'common_res','M0049'),(756,'common_res','M0050'),(757,'common_res','M0051'),(758,'common_res','C0485'),(759,'common_res','C0486'),(760,'common_res','C0487'),(761,'common_res','C0488'),(762,'common_res','C0489'),(763,'common_res','C0490'),(764,'common_res','C0491'),(765,'common_res','C0492'),(766,'common_res','C0493'),(767,'common_res','C0494'),(768,'common_res','C0495'),(769,'common_res','C0496'),(770,'common_res','C0497'),(771,'common_res','C0498'),(772,'common_res','C0499'),(773,'common_res','C0500'),(774,'common_res','C0501'),(775,'common_res','C0502'),(776,'common_res','C0503'),(777,'common_res','C0504'),(778,'common_res','C0505'),(779,'common_res','C0506'),(780,'common_res','C0507'),(781,'common_res','C0508'),(782,'common_res','C0509'),(783,'common_res','C0510'),(784,'common_res','C0511'),(785,'common_res','C0512'),(786,'common_res','C0513'),(787,'common_res','C0514'),(788,'common_res','C0515'),(789,'common_res','C0516'),(790,'common_res','C0517'),(791,'common_res','C0518'),(792,'common_res','C0519'),(793,'common_res','C0520'),(794,'common_res','C0521'),(795,'common_res','C0522'),(796,'common_res','C0523'),(797,'common_res','C0524'),(798,'common_res','C0525'),(799,'common_res','C0526'),(800,'common_res','C0527'),(801,'common_res','C0528'),(802,'common_res','C0529'),(803,'common_res','C0530'),(804,'common_res','C0531'),(805,'common_res','C0532'),(806,'common_res','C0533'),(807,'common_res','C0534'),(808,'common_res','C0535'),(809,'common_res','C0536'),(810,'common_res','C0537'),(811,'common_res','C0538'),(812,'common_res','C0539'),(813,'common_res','C0540'),(814,'common_res','C0541'),(815,'common_res','C0542'),(816,'common_res','C0543'),(817,'common_res','C0544'),(818,'common_res','C0545'),(819,'common_res','C0546'),(820,'common_res','C0547'),(821,'common_res','C0548'),(822,'common_res','C0549'),(823,'common_res','C0550'),(824,'common_res','C0551'),(825,'common_res','C0552'),(826,'common_res','C0553'),(827,'common_res','C0554'),(828,'common_res','C0555'),(829,'common_res','C0556'),(830,'common_res','C0557'),(831,'common_res','C0558'),(832,'common_res','C0559'),(833,'common_res','C0560'),(834,'common_res','C0561'),(835,'common_res','C0562'),(836,'common_res','C0563'),(837,'common_res','C0564'),(838,'common_res','C0565'),(839,'common_res','C0566'),(840,'common_res','C0567'),(841,'common_res','C0568'),(842,'common_res','C0569'),(843,'common_res','C0570'),(844,'common_res','C0571'),(845,'common_res','C0572'),(846,'common_res','C0573'),(847,'common_res','C0574'),(848,'common_res','C0575'),(849,'common_res','C0576'),(850,'common_res','C0577'),(851,'common_res','C0578'),(852,'common_res','C0579'),(853,'common_res','C0580'),(854,'common_res','C0581'),(855,'common_res','C0582'),(856,'common_res','C0583'),(857,'common_res','C0584'),(858,'common_res','C0585'),(859,'common_res','C0586'),(860,'common_res','C0587'),(861,'common_res','C0588'),(862,'common_res','C0589'),(863,'common_res','C0590'),(864,'common_res','C0591'),(865,'common_res','C0592'),(866,'common_res','C0593'),(867,'common_res','C0596'),(868,'common_res','C0597'),(869,'common_res','C0598'),(870,'common_res','C0599'),(871,'common_res','C0600'),(872,'common_res','C0601'),(873,'common_res','C0602'),(874,'common_res','C0603'),(875,'common_res','C0604'),(876,'common_res','C0605'),(877,'common_res','C0606'),(878,'common_res','C0607'),(879,'common_res','C0608'),(880,'common_res','C0609'),(881,'common_res','C0610'),(882,'common_res','C0610'),(883,'common_res','C0611'),(884,'common_res','C0612'),(885,'common_res','C0613'),(886,'common_res','C0614'),(887,'common_res','C0615'),(888,'common_res','C0616'),(889,'common_res','C0617'),(890,'common_res','C0618'),(891,'common_res','C0619'),(892,'common_res','C0620'),(893,'common_res','C0621'),(894,'common_res','C0622'),(895,'common_res','C0623'),(896,'common_res','C0624'),(897,'common_res','C0625'),(898,'common_res','C0626'),(899,'common_res','C0627'),(900,'common_res','C0628'),(901,'common_res','C0629'),(902,'common_res','C0630'),(903,'common_res','C0631'),(904,'common_res','C0632'),(905,'common_res','C0633'),(906,'common_res','C0634'),(907,'common_res','C0635'),(908,'common_res','C0636'),(909,'common_res','C0637'),(910,'common_res','M0052'),(911,'common_res','C0642'),(912,'common_res','C0643'),(913,'common_res','C0644'),(914,'common_res','C0645'),(915,'common_res','C0646'),(916,'common_res','C0647'),(917,'common_res','C0648'),(918,'common_res','C0649'),(919,'common_res','C0650'),(920,'common_res','C0651'),(921,'common_res','C0652'),(922,'common_res','C0653'),(923,'common_res','C0654'),(924,'common_res','C0655'),(925,'common_res','C0656'),(926,'common_res','C0657'),(927,'common_res','C0658'),(928,'common_res','C0659'),(929,'common_res','C0660'),(930,'common_res','C0661'),(931,'common_res','C0662'),(932,'common_res','C0663'),(933,'common_res','C0664'),(934,'common_res','C0665'),(935,'common_res','C0666'),(936,'common_res','C0667'),(937,'common_res','C0668'),(938,'common_res','C0669'),(939,'common_res','C0670'),(940,'common_res','C0671'),(941,'common_res','C0672'),(942,'common_res','C0674'),(943,'common_res','C0675'),(944,'common_res','C0676'),(945,'common_res','C0678'),(946,'common_res','C0679'),(947,'common_res','C0684'),(948,'common_res','C0685'),(949,'common_res','C0692'),(950,'common_res','C0693'),(951,'common_res','C0694'),(952,'common_res','C0722'),(953,'common_res','C0743'),(954,'common_res','C0744'),(955,'common_res','C0745'),(956,'common_res','C0746'),(957,'common_res','C0747'),(958,'common_res','C0748'),(959,'common_res','C0749'),(960,'common_res','C0750'),(961,'common_res','C0751'),(962,'common_res','C0752'),(963,'common_res','C0753'),(964,'common_res','C0754'),(965,'common_res','C0755'),(966,'common_res','C0756'),(967,'common_res','C0757'),(968,'common_res','C0758'),(969,'common_res','C0759'),(970,'common_res','C0760'),(971,'common_res','C0761'),(972,'common_res','C0762'),(973,'common_res','C0763'),(974,'common_res','C0764'),(975,'common_res','C0767'),(976,'common_res','C0768'),(977,'common_res','C0769'),(978,'common_res','C0770'),(979,'common_res','C0771'),(980,'common_res','C0772'),(981,'common_res','C0773'),(982,'common_res','C0774'),(983,'common_res','C0775'),(984,'common_res','C0776'),(985,'common_res','C0777'),(986,'common_res','C0778'),(987,'common_res','M0053'),(988,'common_res','C0779'),(989,'common_res','C0780'),(990,'common_res','C0781'),(991,'common_res','C0782'),(992,'common_res','C0783'),(993,'common_res','C0784'),(994,'common_res','C0785'),(995,'common_res','C0786'),(996,'common_res','C0787'),(997,'common_res','C0788'),(998,'common_res','C0789'),(999,'common_res','C0790'),(1000,'common_res','C0791'),(1001,'common_res','C0792'),(1002,'common_res','C0793'),(1003,'common_res','C0794'),(1004,'common_res','C0795'),(1005,'common_res','C0796'),(1006,'common_res','C0797'),(1007,'common_res','C0798'),(1008,'common_res','C0799'),(1009,'common_res','C0800'),(1010,'common_res','C0801'),(1011,'common_res','C0802'),(1012,'common_res','C0803'),(1013,'common_res','C0804'),(1014,'common_res','C0805'),(1015,'common_res','C0806'),(1016,'common_res','C0807'),(1017,'common_res','C0808'),(1018,'common_res','C0809'),(1019,'common_res','C0810'),(1020,'common_res','C0811'),(1021,'common_res','C0812'),(1022,'common_res','C0813'),(1023,'common_res','C0814'),(1024,'common_res','C0815'),(1025,'common_res','C0816'),(1026,'common_res','C0817'),(1027,'common_res','C0818'),(1028,'common_res','C0819'),(1029,'common_res','C0820'),(1030,'common_res','C0821'),(1031,'common_res','C0822'),(1032,'common_res','C0823'),(1033,'common_res','C0824'),(1034,'common_res','C0825'),(1035,'common_res','C0826'),(1036,'common_res','C0827'),(1037,'common_res','C0828'),(1038,'common_res','C0829'),(1039,'common_res','C0830'),(1040,'common_res','C0831'),(1041,'common_res','C0832'),(1042,'common_res','C0833'),(1043,'common_res','C0834'),(1044,'common_res','C0835'),(1045,'common_res','C0836'),(1046,'common_res','C0837'),(1047,'common_res','C0838'),(1048,'common_res','C0839'),(1049,'common_res','C0840'),(1050,'common_res','M0054'),(1051,'common_res','M0055'),(1052,'common_res','C0842'),(1053,'common_res','C0843'),(1054,'common_res','C0844'),(1055,'common_res','C0845'),(1056,'common_res','C0846'),(1057,'common_res','E0047'),(1058,'common_res','C0854'),(1059,'common_res','C0855'),(1060,'common_res','C0856'),(1061,'common_res','C0857'),(1062,'common_res','C0858'),(1063,'common_res','C0859'),(1064,'common_res','C0860'),(1065,'common_res','C0861'),(1066,'common_res','C0862'),(1067,'common_res','C0863'),(1068,'common_res','C0864'),(1069,'common_res','C0865'),(1070,'common_res','C0866'),(1071,'common_res','C0867'),(1072,'common_res','C0868'),(1073,'common_res','C0869'),(1074,'common_res','C0870'),(1075,'common_res','C0871'),(1076,'common_res','C0872'),(1077,'common_res','C0873'),(1078,'common_res','C0874'),(1079,'common_res','C0875'),(1080,'common_res','C0876'),(1081,'common_res','C0877'),(1082,'common_res','C0878'),(1083,'common_res','C0879'),(1084,'common_res','C0880'),(1085,'common_res','C0881'),(1086,'common_res','C0882'),(1087,'common_res','C0883'),(1088,'common_res','C0884'),(1089,'common_res','C0890'),(1090,'common_res','C0891'),(1091,'common_res','C0939'),(1092,'common_res','C0940'),(1093,'common_res','C0941'),(1094,'common_res','C0942'),(1095,'common_res','C0943'),(1096,'common_res','C0944'),(1097,'common_res','C0945'),(1098,'common_res','C0946'),(1099,'common_res','C0947'),(1100,'common_res','C0948'),(1101,'common_res','C0949'),(1102,'common_res','C0950'),(1103,'common_res','C0951'),(1104,'common_res','C0952'),(1105,'common_res','C0953'),(1106,'common_res','C0954'),(1107,'common_res','C0955'),(1108,'common_res','C0956'),(1109,'common_res','C0957'),(1110,'common_res','C0958'),(1111,'common_res','C0959'),(1112,'common_res','C0960'),(1113,'common_res','C0961'),(1114,'common_res','C0962'),(1115,'common_res','C0963'),(1116,'common_res','C0964'),(1117,'common_res','C0965'),(1118,'common_res','C0966'),(1119,'common_res','C0967'),(1120,'common_res','C0968'),(1121,'common_res','C0969'),(1122,'common_res','C0970'),(1123,'common_res','C0971'),(1124,'common_res','C0972'),(1125,'common_res','C0973'),(1126,'common_res','C0974'),(1127,'common_res','C0975'),(1128,'common_res','C0976'),(1129,'common_res','C0977'),(1130,'common_res','C0978'),(1131,'common_res','C0979'),(1132,'common_res','C0980'),(1133,'common_res','C0981'),(1134,'common_res','C0983'),(1135,'common_res','C0984'),(1136,'common_res','C0985'),(1137,'common_res','C0986'),(1138,'common_res','C0987'),(1139,'common_res','C0988'),(1140,'common_res','C0989'),(1141,'common_res','C0990'),(1142,'common_res','C0995'),(1143,'common_res','C0996'),(1144,'common_res','C0997'),(1145,'common_res','C0998'),(1146,'common_res','C0999'),(1147,'common_res','C1002'),(1148,'common_res','C1003'),(1149,'common_res','C1009'),(1150,'common_res','C1011'),(1151,'common_res','C1014'),(1152,'common_res','C1015'),(1153,'common_res','C1016'),(1154,'common_res','C1017'),(1155,'common_res','C1018'),(1156,'common_res','C1019'),(1157,'common_res','C1020'),(1158,'common_res','C1021'),(1159,'common_res','C1025'),(1160,'common_res','C1030'),(1161,'common_res','C1031'),(1162,'common_res','C1032'),(1163,'common_res','C1033'),(1164,'common_res','C1034'),(1165,'common_res','C1035'),(1166,'common_res','C1036'),(1167,'common_res','C1037'),(1168,'common_res','C1038'),(1169,'common_res','C1039'),(1170,'common_res','C1040'),(1171,'common_res','C1041'),(1172,'common_res','C1042'),(1173,'common_res','C1043'),(1174,'common_res','C1044'),(1175,'common_res','C1045'),(1176,'common_res','C1046'),(1177,'common_res','C1047'),(1178,'common_res','C1048'),(1179,'common_res','C1049'),(1180,'common_res','C1050'),(1181,'common_res','C1051'),(1182,'common_res','C1052'),(1183,'common_res','C1053'),(1184,'common_res','C1054'),(1185,'common_res','C1055'),(1186,'common_res','C1056'),(1187,'common_res','C1057'),(1188,'common_res','C1058'),(1189,'common_res','C1059'),(1190,'common_res','C1060'),(1191,'common_res','C1061'),(1192,'common_res','C1062'),(1193,'common_res','C0734'),(1194,'common_res','C1063'),(1195,'common_res','C1064'),(1196,'common_res','C1065'),(1197,'common_res','C1066'),(1198,'common_res','C1067'),(1199,'common_res','C1068'),(1200,'common_res','C1069'),(1201,'common_res','C1070'),(1202,'common_res','C1071'),(1203,'common_res','C1072'),(1204,'common_res','C1073'),(1205,'common_res','C1074'),(1206,'common_res','C1075'),(1207,'common_res','C1076'),(1208,'common_res','C1077'),(1209,'common_res','C1078'),(1210,'common_res','C1079'),(1211,'common_res','C1080'),(1212,'common_res','C1081'),(1213,'common_res','C1082'),(1214,'common_res','C1083'),(1215,'common_res','C1084'),(1216,'common_res','C1085'),(1217,'common_res','C1086'),(1218,'common_res','C1087'),(1219,'common_res','C1088'),(1220,'common_res','C1089'),(1221,'common_res','C1090'),(1222,'common_res','C1091'),(1223,'common_res','C1092'),(1224,'common_res','C1093'),(1225,'common_res','C1094'),(1226,'common_res','C1095'),(1227,'common_res','C1096'),(1228,'common_res','C1097'),(1229,'common_res','C1098'),(1230,'common_res','C1099'),(1231,'common_res','C1100'),(1232,'common_res','C1101'),(1233,'common_res','C1102'),(1234,'common_res','C1103'),(1235,'common_res','C1104'),(1236,'common_res','C1105'),(1237,'common_res','C1106'),(1238,'common_res','C1107'),(1239,'common_res','C1108'),(1240,'common_res','C1109'),(1241,'common_res','C1110'),(1242,'common_res','C1111'),(1243,'common_res','C1112'),(1244,'common_res','C1113'),(1245,'common_res','C1114'),(1246,'common_res','C1115'),(1247,'common_res','C1116'),(1248,'common_res','C1117'),(1249,'common_res','C1118'),(1250,'common_res','C1119'),(1251,'common_res','C1120'),(1252,'common_res','C1121'),(1253,'common_res','C1122'),(1254,'common_res','C1123'),(1255,'common_res','C1124'),(1256,'common_res','C1125'),(1257,'common_res','C1134'),(1258,'common_res','C1135'),(1259,'common_res','C1136'),(1260,'common_res','C1137'),(1261,'common_res','C1138'),(1262,'common_res','C1139'),(1263,'common_res','C0713'),(1264,'common_res','C1140'),(1265,'common_res','C1142'),(1266,'common_res','C1143'),(1267,'common_res','C1145'),(1268,'common_res','C1146'),(1269,'common_res','C1141'),(1270,'common_res','C1147'),(1271,'common_res','C1148'),(1272,'common_res','C1149'),(1273,'common_res','C1150'),(1274,'common_res','C1151'),(1275,'common_res','C1152'),(1276,'common_res','C1153'),(1277,'common_res','C1154'),(1278,'common_res','C1155'),(1279,'common_res','C1156'),(1280,'common_res','C1157'),(1281,'common_res','C1158'),(1282,'common_res','C1159'),(1283,'common_res','C1160'),(1284,'common_res','C1161'),(1285,'common_res','C1162'),(1286,'common_res','C1163'),(1287,'common_res','C1164'),(1288,'common_res','C1165'),(1289,'common_res','C1166'),(1290,'common_res','C1167'),(1291,'common_res','C1168'),(1292,'common_res','C1169'),(1293,'common_res','C1170'),(1294,'common_res','C1171'),(1295,'common_res','C1172'),(1296,'common_res','C1173'),(1297,'common_res','C1174'),(1298,'common_res','C1175'),(1299,'common_res','C1176'),(1300,'common_res','C1177'),(1301,'common_res','C1178'),(1302,'common_res','C1181'),(1303,'common_res','C1182'),(1304,'common_res','C1183'),(1305,'common_res','C1184'),(1306,'common_res','C1185'),(1307,'common_res','C1188'),(1308,'common_res','C1189'),(1309,'common_res','C1190'),(1310,'common_res','C1191'),(1311,'common_res','C1192'),(1312,'common_res','C1193'),(1313,'common_res','C1194'),(1314,'common_res','C1195'),(1315,'common_res','C1196'),(1316,'common_res','C1197'),(1317,'common_res','C1198'),(1318,'common_res','C1199'),(1319,'common_res','C1200'),(1320,'common_res','C1201'),(1321,'common_res','C1202'),(1322,'common_res','C1203'),(1323,'common_res','C1204'),(1324,'common_res','C1205'),(1325,'common_res','C1206'),(1326,'common_res','C1207'),(1327,'common_res','C1208'),(1328,'common_res','C1209'),(1329,'common_res','C1210'),(1330,'common_res','C1211'),(1331,'common_res','C1212'),(1332,'common_res','C1215'),(1333,'common_res','C1216'),(1334,'common_res','C1222'),(1335,'common_res','C1223'),(1336,'common_res','C1224'),(1337,'common_res','C1225'),(1338,'common_res','C1226'),(1339,'common_res','C1227'),(1340,'common_res','C1228'),(1341,'common_res','C1229'),(1342,'common_res','C1230'),(1343,'common_res','C1231'),(1344,'common_res','C1232'),(1345,'common_res','C0719'),(1346,'common_res','M0056'),(1347,'common_res','C1236'),(1348,'common_res','C1237'),(1349,'common_res','C1238'),(1350,'common_res','C1239'),(1351,'common_res','C1240'),(1352,'common_res','C1241'),(1353,'common_res','C1242'),(1354,'common_res','C1243'),(1355,'common_res','C1244'),(1356,'common_res','C1245'),(1357,'common_res','C1246'),(1358,'common_res','C1247'),(1359,'common_res','C1248'),(1360,'common_res','C1249'),(1361,'common_res','C1250'),(1362,'common_res','C1251'),(1363,'common_res','C1252'),(1364,'common_res','C1253'),(1365,'common_res','C1254'),(1366,'common_res','C1255'),(1367,'common_res','C1256'),(1368,'common_res','C1257'),(1369,'common_res','C1258'),(1370,'common_res','C1259'),(1371,'common_res','C1260'),(1372,'common_res','C1261'),(1373,'common_res','C1262'),(1374,'common_res','C1263'),(1375,'common_res','C1264'),(1376,'common_res','C1265'),(1377,'common_res','C1266'),(1378,'common_res','C1267'),(1379,'common_res','C1268'),(1380,'common_res','C1269'),(1381,'common_res','C1270'),(1382,'common_res','C1271'),(1383,'common_res','C1272'),(1384,'common_res','C0938'),(1385,'common_res','C1273'),(1386,'common_res','C1274'),(1387,'common_res','C1275'),(1388,'common_res','C1276'),(1389,'common_res','C1277'),(1390,'common_res','C1278'),(1391,'common_res','C1279'),(1392,'common_res','C1280'),(1393,'common_res','C1281'),(1394,'common_res','C1282'),(1395,'common_res','C1283'),(1396,'common_res','C1284'),(1397,'common_res','C1285'),(1398,'common_res','C1286'),(1399,'common_res','C1287'),(1400,'common_res','C1288'),(1401,'common_res','C1289'),(1402,'common_res','C1290'),(1403,'common_res','C1291'),(1404,'common_res','C1292'),(1405,'common_res','C1293'),(1406,'common_res','C1294'),(1407,'common_res','C1295'),(1408,'common_res','C1296'),(1409,'common_res','C1297'),(1410,'common_res','C1298'),(1411,'common_res','C1299'),(1412,'common_res','C1300'),(1413,'common_res','C1301'),(1414,'common_res','C1302'),(1415,'common_res','C1303'),(1416,'common_res','C1304'),(1417,'common_res','C1305'),(1418,'common_res','C1306'),(1419,'common_res','C1307'),(1420,'common_res','C1308'),(1421,'common_res','C1309'),(1422,'common_res','C1310'),(1423,'common_res','C1311'),(1424,'common_res','C1312'),(1425,'common_res','C1313'),(1426,'common_res','C1314'),(1427,'common_res','C1315'),(1428,'common_res','C1316'),(1429,'common_res','C1317'),(1430,'common_res','C1318'),(1431,'common_res','C1319'),(1432,'common_res','C1320'),(1433,'common_res','C1321'),(1434,'common_res','C1322'),(1435,'common_res','C1323'),(1436,'common_res','C1324'),(1437,'common_res','C1325'),(1438,'common_res','C1326'),(1439,'common_res','C1327'),(1440,'common_res','C1328'),(1441,'common_res','C1329'),(1442,'common_res','C1330'),(1443,'common_res','C1331'),(1444,'common_res','C1332'),(1445,'common_res','C1333'),(1446,'common_res','C1334'),(1447,'common_res','C1335'),(1448,'common_res','C1336'),(1449,'common_res','C1337'),(1450,'common_res','C1338'),(1451,'common_res','C1339'),(1452,'common_res','C1340'),(1453,'common_res','C1341'),(1454,'common_res','C1342'),(1455,'common_res','C1343'),(1456,'common_res','C1344'),(1457,'common_res','C1345'),(1458,'common_res','C1346'),(1459,'common_res','C1347'),(1460,'common_res','C1348'),(1461,'common_res','C1349'),(1462,'common_res','C1350'),(1463,'common_res','C1351'),(1464,'common_res','C1352'),(1465,'common_res','C1353'),(1466,'common_res','C1354'),(1467,'common_res','C1355'),(1468,'common_res','C1356'),(1469,'common_res','C1357'),(1470,'common_res','C1358'),(1471,'common_res','C1359'),(1472,'common_res','C1360'),(1473,'common_res','C1361'),(1474,'common_res','C1362'),(1475,'common_res','C1363'),(1476,'common_res','C1364'),(1477,'common_res','C1365'),(1478,'common_res','C1366'),(1479,'common_res','C1367'),(1480,'common_res','C1368'),(1481,'common_res','C1369'),(1482,'common_res','C1370'),(1483,'common_res','C1371'),(1484,'common_res','C1372'),(1485,'common_res','C1373'),(1486,'common_res','C1374'),(1487,'common_res','C1375'),(1488,'common_res','C1376'),(1489,'common_res','C1377'),(1490,'common_res','C1378'),(1491,'common_res','C1382'),(1492,'common_res','C1383'),(1493,'common_res','C1387'),(1494,'common_res','C1388'),(1495,'common_res','C1389'),(1496,'common_res','C1390'),(1497,'common_res','C1391'),(1498,'common_res','C1392'),(1499,'common_res','C1393'),(1500,'common_res','C1394'),(1501,'common_res','C1395'),(1502,'common_res','C1396'),(1503,'common_res','C1397'),(1504,'common_res','C1398'),(1505,'common_res','C1399'),(1506,'common_res','C1400'),(1507,'common_res','C1401'),(1508,'common_res','C1403'),(1509,'common_res','C1404'),(1510,'common_res','C1405'),(1511,'common_res','C1406'),(1512,'common_res','C1407'),(1513,'common_res','C1408'),(1514,'common_res','C1409'),(1515,'common_res','C1410'),(1516,'common_res','C1411'),(1517,'common_res','C1412'),(1518,'common_res','C1413'),(1519,'common_res','C1414'),(1520,'common_res','C1415'),(1521,'common_res','C1416'),(1522,'common_res','C1417'),(1523,'common_res','C1418'),(1524,'common_res','C1419'),(1525,'common_res','C1420'),(1526,'common_res','C1421'),(1527,'common_res','C1422'),(1528,'common_res','C1423'),(1529,'common_res','C1424'),(1530,'common_res','C1425'),(1531,'common_res','C1426'),(1532,'common_res','C1427'),(1533,'common_res','C1428'),(1534,'common_res','C1429'),(1535,'common_res','C1430'),(1536,'common_res','C1431'),(1537,'common_res','C1432'),(1538,'common_res','C1433'),(1539,'common_res','C1434'),(1540,'common_res','C1435'),(1541,'common_res','C1436'),(1542,'common_res','C1437'),(1543,'common_res','C1438'),(1544,'common_res','C1439'),(1545,'common_res','C1440'),(1546,'common_res','C1441'),(1547,'common_res','C1442'),(1548,'common_res','C1443'),(1549,'common_res','C1444'),(1550,'common_res','C1445'),(1551,'common_res','C1446'),(1552,'common_res','C1447'),(1553,'common_res','C1448'),(1554,'common_res','C1449'),(1555,'common_res','C1450'),(1556,'common_res','C1451'),(1557,'common_res','C1452'),(1558,'common_res','C1453'),(1559,'common_res','C1454'),(1560,'common_res','C1455'),(1561,'common_res','C1456'),(1562,'common_res','C1457'),(1563,'common_res','C1458'),(1564,'common_res','C1459'),(1565,'common_res','C1460'),(1566,'common_res','C1461'),(1567,'common_res','C1462'),(1568,'common_res','C1463'),(1569,'common_res','C1464'),(1570,'common_res','C1465'),(1571,'common_res','C1466'),(1572,'common_res','C1467'),(1573,'common_res','C1468'),(1574,'common_res','C1469'),(1575,'common_res','C1470'),(1576,'common_res','C1471'),(1577,'common_res','C1472'),(1578,'common_res','C1473'),(1579,'common_res','C1474'),(1580,'common_res','C1475'),(1581,'common_res','C1476'),(1582,'common_res','C1477'),(1583,'common_res','C1478'),(1584,'common_res','C1479'),(1585,'common_res','C1480'),(1586,'common_res','C1481'),(1587,'common_res','C1482'),(1588,'common_res','C1483'),(1589,'common_res','C1484'),(1590,'common_res','C0919'),(1591,'common_res','C0899'),(1592,'common_res','C0927'),(1593,'common_res','C1485'),(1594,'common_res','C1486'),(1595,'common_res','C1487'),(1596,'common_res','C1488'),(1597,'common_res','C1489'),(1598,'common_res','C1490'),(1599,'common_res','C1491'),(1600,'common_res','C1492'),(1601,'common_res','C1493'),(1602,'common_res','C1494'),(1603,'common_res','C1495'),(1604,'common_res','C1496'),(1605,'common_res','C1497'),(1606,'common_res','C1498'),(1607,'common_res','C1499'),(1608,'common_res','C1500'),(1609,'common_res','C1501'),(1610,'common_res','C1502'),(1611,'common_res','C1503'),(1612,'common_res','C1504'),(1613,'common_res','C1505'),(1614,'common_res','C1506'),(1615,'common_res','C1507'),(1616,'common_res','C1508'),(1617,'common_res','C1509'),(1618,'common_res','C1510'),(1619,'common_res','C1511'),(1620,'common_res','C1512'),(1621,'common_res','C1513'),(1622,'common_res','C1514'),(1623,'common_res','C1515'),(1624,'common_res','C1516'),(1625,'common_res','C1517'),(1626,'common_res','C1518'),(1627,'common_res','C1519'),(1628,'common_res','C1520'),(1629,'common_res','C1521'),(1630,'common_res','C1522'),(1631,'common_res','C1523'),(1632,'common_res','C1524'),(1633,'common_res','C1525'),(1634,'common_res','C1526'),(1635,'common_res','C1527'),(1636,'common_res','C1528'),(1637,'common_res','C1529'),(1638,'common_res','C1530'),(1639,'common_res','C1531'),(1640,'common_res','C1532'),(1641,'common_res','C1533'),(1642,'common_res','C1534'),(1643,'common_res','C1535'),(1644,'common_res','C1536'),(1645,'common_res','C1537'),(1646,'common_res','C1538'),(1647,'common_res','C1539'),(1648,'common_res','C1540'),(1649,'common_res','C1541'),(1650,'common_res','C1542'),(1651,'common_res','C0724'),(1652,'common_res','C1543'),(1653,'common_res','C1545'),(1654,'common_res','C1546'),(1655,'common_res','C0893'),(1656,'common_res','C1547'),(1657,'common_res','C1548'),(1658,'common_res','C1549'),(1659,'common_res','C1550'),(1660,'common_res','C1551'),(1661,'common_res','C1552'),(1662,'common_res','C1555'),(1663,'common_res','C1556'),(1664,'common_res','C1557'),(1665,'common_res','C1558'),(1666,'common_res','C1559'),(1667,'common_res','C1560'),(1668,'common_res','C1561'),(1669,'common_res','C1562'),(1670,'common_res','C1563'),(1671,'common_res','C1564'),(1672,'common_res','C0910'),(1673,'common_res','C1565'),(1674,'common_res','C1566'),(1675,'common_res','C1567'),(1676,'common_res','C1568'),(1677,'common_res','C1569'),(1678,'common_res','C1570'),(1679,'common_res','C1571'),(1680,'common_res','C1572'),(1681,'common_res','C1573'),(1682,'common_res','C1574'),(1683,'common_res','C1575'),(1684,'common_res','C1576'),(1685,'common_res','C1577'),(1686,'common_res','C1578'),(1687,'common_res','C1579'),(1688,'common_res','C1580'),(1689,'common_res','C1581'),(1690,'common_res','C1582'),(1691,'common_res','C1583'),(1692,'common_res','C1584'),(1693,'common_res','C1585'),(1694,'common_res','C1586'),(1695,'common_res','C1587'),(1696,'common_res','C1588'),(1697,'common_res','C1589'),(1698,'common_res','C1590'),(1699,'common_res','C1591'),(1700,'common_res','C1592'),(1701,'common_res','C1593'),(1702,'common_res','C1594'),(1703,'common_res','C1595'),(1704,'common_res','C1596'),(1705,'common_res','C1597'),(1706,'common_res','C1598'),(1707,'common_res','C1599'),(1708,'common_res','C1600'),(1709,'common_res','C1601'),(1710,'common_res','C1602'),(1711,'common_res','C1603'),(1712,'common_res','C1616'),(1713,'common_res','C1617'),(1714,'common_res','C1618'),(1715,'common_res','C1619'),(1716,'common_res','C1620'),(1717,'common_res','C1621'),(1718,'common_res','C1622'),(1719,'common_res','C1623'),(1720,'common_res','C1624'),(1721,'common_res','C1625'),(1722,'common_res','C1626'),(1723,'common_res','C1627'),(1724,'common_res','C1628'),(1725,'common_res','C1629'),(1726,'common_res','C1630'),(1727,'common_res','C1631'),(1728,'common_res','C1632'),(1729,'common_res','C1633'),(1730,'common_res','C1634'),(1731,'common_res','C1635'),(1732,'common_res','C1636'),(1733,'common_res','C1637'),(1734,'common_res','C1638'),(1735,'common_res','C1639'),(1736,'common_res','C1008'),(1738,'common_res','C1640'),(1739,'common_res','C1644'),(1740,'common_res','C1645'),(1741,'common_res','C1646'),(1742,'common_res','C1647'),(1743,'common_res','C1648'),(1744,'common_res','C1649'),(1745,'common_res','C1650'),(1746,'common_res','C1651'),(1747,'common_res','C1652'),(1748,'common_res','C1653'),(1749,'common_res','C1654'),(1750,'common_res','C1655'),(1751,'common_res','C1656'),(1752,'common_res','C1657'),(1753,'common_res','C1658'),(1754,'common_res','C1659'),(1755,'common_res','C1660'),(1756,'common_res','C1661'),(1757,'common_res','C1662'),(1758,'common_res','C1663'),(1759,'common_res','C1664'),(1760,'common_res','C1665'),(1761,'common_res','C1666'),(1762,'common_res','C1667'),(1763,'common_res','C1668'),(1764,'common_res','C1669'),(1765,'common_res','C1670'),(1766,'common_res','C1671'),(1767,'common_res','C1672'),(1768,'common_res','C1673'),(1769,'common_res','C1674'),(1770,'common_res','C1675'),(1771,'common_res','C1676'),(1772,'common_res','C1677'),(1773,'common_res','C1678'),(1774,'common_res','C1679'),(1775,'common_res','C1680'),(1776,'common_res','C1681'),(1777,'common_res','C1682'),(1778,'common_res','C1683'),(1779,'common_res','C1684'),(1780,'common_res','C1685'),(1781,'common_res','C1686'),(1782,'common_res','C1687'),(1783,'common_res','C1688'),(1784,'common_res','C1689'),(1785,'common_res','C1690'),(1786,'common_res','C1691'),(1787,'common_res','C1692'),(1788,'common_res','C1693'),(1789,'common_res','C1694'),(1790,'common_res','C1695'),(1791,'common_res','C1696'),(1792,'common_res','C1697'),(1793,'common_res','C1698'),(1794,'common_res','C1699'),(1795,'common_res','C1700'),(1796,'common_res','C1701'),(1797,'common_res','C1702'),(1798,'common_res','C1703'),(1799,'common_res','C1704'),(1800,'common_res','C1705'),(1801,'common_res','C1706'),(1802,'common_res','C1707'),(1803,'common_res','C1708'),(1804,'common_res','C1709'),(1805,'common_res','C1710'),(1806,'common_res','C1711'),(1807,'common_res','C1712'),(1808,'common_res','C1713'),(1809,'common_res','C1714'),(1810,'common_res','C1715'),(1811,'common_res','C1716'),(1812,'common_res','C1717'),(1813,'common_res','C1718'),(1814,'common_res','C1719'),(1815,'common_res','C1720'),(1816,'common_res','C1721'),(1817,'common_res','C1722'),(1818,'common_res','C1723'),(1819,'common_res','C1724');
/*!40000 ALTER TABLE `syssymbol_res` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sysuser`
--

DROP TABLE IF EXISTS `sysuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sysuser` (
  `SysUser_Id` int(11) NOT NULL,
  `FullName` varchar(50) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Pwd` varchar(50) DEFAULT NULL,
  `Tel` varchar(50) DEFAULT NULL,
  `Remark` text,
  `UserType` int(11) DEFAULT NULL,
  `UserToken` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`SysUser_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sysuser`
--

LOCK TABLES `sysuser` WRITE;
/*!40000 ALTER TABLE `sysuser` DISABLE KEYS */;
INSERT INTO `sysuser` VALUES (1,'Admin','Admin','000000','','超级管理员',0,'92EBDC74CF8C2422');
/*!40000 ALTER TABLE `sysuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sysvalue_res`
--

DROP TABLE IF EXISTS `sysvalue_res`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sysvalue_res` (
  `SysValue_Res_Id` int(11) NOT NULL,
  `KeyCode` varchar(20) DEFAULT NULL,
  `LRCode` varchar(10) DEFAULT NULL,
  `LanValue` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`SysValue_Res_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sysvalue_res`
--

LOCK TABLES `sysvalue_res` WRITE;
/*!40000 ALTER TABLE `sysvalue_res` DISABLE KEYS */;
INSERT INTO `sysvalue_res` VALUES (1,'LRCode','zh-cn','语言代码'),(2,'LRCode','en-us','Language Code'),(3,'LRType','zh-cn','语言名称'),(4,'LRType','en-us','Language Name'),(5,'E0004','zh-cn','品牌名称在系统中已经存在，请重新输入！'),(6,'E0004','en-us','Brand\'s name is repeat'),(7,'E0005','zh-cn','该品牌分类在系统中已经存在，请重新输入！'),(8,'E0005','en-us','Brand\'s type name is repeat'),(9,'E0006','zh-cn','该品牌在系统中已经存在，请重新输入！'),(10,'E0006','en-us','Brand\'s name is repeat'),(11,'E0007','zh-cn','该种类名称在系统中已经存在，请重新输入！'),(12,'E0007','en-us','Product Category\'s name is repeat'),(13,'KeyCode','zh-cn','资源对象'),(14,'KeyCode','en-us','Object'),(15,'LanValue','zh-cn','值'),(16,'LanValue','en-us','Value'),(17,'BrandType_Id','zh-cn','资源对象'),(18,'BrandType_Id','en-us','Object'),(19,'BrandTypeName','zh-cn','品牌分类'),(20,'BrandTypeName','en-us','Brand Category'),(21,'Brand_Id','zh-cn','资源对象'),(22,'Brand_Id','en-us','Object'),(23,'BrandName','zh-cn','品牌名称'),(24,'BrandName','en-us','Brand Name'),(25,'ProdCategory_Id','zh-cn','资源对象'),(26,'ProdCategory_Id','en-us','Object'),(27,'PdcName','zh-cn','商品分类'),(28,'PdcName','en-us','Product Category'),(29,'ProdProperty_Id','zh-cn','属性内部主键'),(30,'ProdProperty_Id','en-us','Property Primary Key'),(31,'ProdPropName','zh-cn','属性名称'),(32,'ProdPropName','en-us','Property Name'),(33,'ValueRange','zh-cn','值范围'),(34,'ValueRange','en-us','Value Range'),(35,'Remark','zh-cn','备注'),(36,'Remark','en-us','Remark'),(37,'SysCurrency_Id','zh-cn','资源对象'),(38,'SysCurrency_Id','en-us','Object'),(39,'CurrName','zh-cn','货币名称'),(40,'CurrName','en-us','Currency Name'),(41,'PValueId','zh-cn','资源对象'),(42,'PValueId','en-us','Object'),(43,'PValue','zh-cn','属性值'),(44,'PValue','en-us','Property Value'),(67,'Brand_Res_Id','zh-cn','内部主键'),(68,'Brand_Res_Id','en-us','Primary Key'),(69,'BrandType_Res_Id','zh-cn','内部主键'),(70,'BrandType_Res_Id','en-us','Primary Key'),(71,'ProdCategory_Res_Id','zh-cn','内部主键'),(72,'ProdCategory_Res_Id','en-us','Primary Key'),(73,'ProdProperty_Res_Id','zh-cn','内部主键'),(74,'ProdProperty_Res_Id','en-us','Primary Key'),(75,'PropValue_Res_Id','zh-cn','内部主键'),(76,'PropValue_Res_Id','en-us','Primary Key'),(77,'SysCurrency_Res_Id','zh-cn','内部主键'),(78,'SysCurrency_Res_Id','en-us','Primary Key'),(79,'SysValue_Res_Id','zh-cn','内部主键'),(80,'SysValue_Res_Id','en-us','Primary Key'),(81,'C0043','en-us','Brand'),(82,'C0044','en-us','BrandType'),(83,'C0045','en-us','BrandList'),(84,'C0046','en-us','New Brand'),(85,'C0047','en-us','BrandType List'),(86,'C0048','en-us','New BrandType'),(87,'C0050','en-us','Brand Name'),(88,'C0051','en-us','Brand Logo'),(89,'C0052','en-us','Website'),(90,'C0053','en-us','ECMS-Brand'),(91,'C0054','en-us','Modify BrandType'),(92,'C0055','en-us','Is Delete BrandType'),(93,'C0056','en-us','BrandType can not be empty！'),(94,'C0057','en-us','Seq can not be empty！'),(95,'C0058','en-us','Modify Brand'),(96,'C0059','en-us','Is delete brand'),(97,'C0060','en-us','Brand name can not be empty！'),(98,'C0043','zh-cn','商品品牌'),(99,'C0044','zh-cn','品牌分类'),(100,'C0045','zh-cn','品牌列表'),(101,'C0046','zh-cn','新增品牌'),(102,'C0047','zh-cn','品牌分类列表'),(103,'C0048','zh-cn','新增品牌分类'),(104,'C0050','zh-cn','品牌名称'),(105,'C0051','zh-cn','品牌Logo'),(106,'C0052','zh-cn','官方网址'),(107,'C0053','zh-cn','ECMS-品牌'),(108,'C0054','zh-cn','修改品牌分类'),(109,'C0055','zh-cn','是否删除该品牌分类'),(110,'C0056','zh-cn','品牌分类不能为空，请重新输入！'),(111,'C0057','zh-cn','序号不能为空，请重新输入！'),(112,'C0058','zh-cn','修改品牌'),(113,'C0059','zh-cn','是否删除该品牌'),(114,'C0060','zh-cn','品牌名称不能为空，请重新输入！'),(115,'C0001','en-us','Dream business'),(116,'C0002','en-us','Our journey began'),(117,'C0003','en-us','My account'),(118,'C0004','en-us','Logout'),(119,'C0005','en-us','help'),(120,'C0007','en-us','Language:'),(121,'C0014','en-us','Prompted'),(122,'C0019','en-us','Operation'),(123,'C0023','en-us','Cancel'),(124,'C0024','en-us','OK'),(125,'C0037','en-us','Next'),(126,'C0038','en-us','Last'),(127,'C0039','en-us','Total'),(128,'C0040','en-us','Number'),(129,'C0041','en-us','Seq'),(130,'C0042','en-us','Ask'),(131,'C0049','en-us','must'),(132,'C0061','en-us','Modify'),(133,'C0062','en-us','Delete'),(134,'C0073','en-us','Remark'),(135,'C0076','en-us','Dropdownlist'),(136,'C0077','en-us','Radiobox'),(137,'C0078','en-us','Checkbox'),(138,'C0079','en-us','Textbox'),(139,'C0088','en-us','Default Value'),(140,'C0099','en-us','Please select Category！'),(141,'C0103','en-us','Select Category'),(142,'C0104','en-us','In the commodity classification does not exist, please re-enter or select！'),(143,'C0108','en-us','Yes'),(144,'C0109','en-us','No'),(145,'C0111','en-us','Product Name'),(146,'C0112','en-us','Brand'),(147,'C0113','en-us','Category'),(148,'C0114','en-us','Picture'),(150,'C0116','en-us','Product Description'),(153,'C0142','en-us','AutoGenerate'),(154,'C0146','en-us','Date'),(155,'M0001','en-us','Home'),(156,'M0002','en-us','Product Manage'),(157,'M0003','en-us','Purchase Manage'),(158,'M0004','en-us','Logistics Manage'),(159,'M0005','en-us','Customer Manage'),(160,'M0006','en-us','Other'),(162,'M0008','en-us','System Settings'),(163,'M0010','en-us','Category'),(164,'M0011','en-us','Brand'),(165,'M0012','en-us','Product'),(166,'M0013','en-us','Regional pricing'),(167,'M0014','en-us','Commodity Stocks'),(168,'M0015','en-us','Product Attributes'),(169,'M0016','en-us','Sales gifts'),(170,'M0017','en-us','Cost of goods'),(171,'M0018','en-us','New listing'),(172,'M0019','en-us','Recommended'),(178,'M0025','en-us','Sale Order'),(182,'M0029','en-us','Customer'),(186,'M0033','en-us','Payment'),(187,'M0034','en-us','Rate Setting'),(190,'M0037','en-us','Key Parameter'),(191,'M0038','en-us','Shopping Site'),(192,'M0039','en-us','Shopping Template'),(194,'M0041','en-us','Multi-language'),(195,'E0003','en-us','UploadFile is not empty!'),(196,'C0001','zh-cn','梦想商务'),(197,'C0002','zh-cn','让我们的旅程从此开始'),(198,'C0003','zh-cn','我的系统账号'),(199,'C0004','zh-cn','注销'),(200,'C0005','zh-cn','系统帮助'),(201,'C0007','zh-cn','选择语言:'),(202,'C0014','zh-cn','系统提示'),(203,'C0019','zh-cn','操作列'),(204,'C0023','zh-cn','取消'),(205,'C0024','zh-cn','确定'),(206,'C0037','zh-cn','上一页'),(207,'C0038','zh-cn','下一页'),(208,'C0039','zh-cn','总共'),(209,'C0040','zh-cn','条数据'),(210,'C0041','zh-cn','序号'),(211,'C0042','zh-cn','删除询问'),(212,'C0049','zh-cn','必填'),(213,'C0061','zh-cn','修改'),(214,'C0062','zh-cn','删除'),(215,'C0073','zh-cn','备注'),(216,'C0076','zh-cn','下拉框'),(217,'C0077','zh-cn','单选框'),(218,'C0078','zh-cn','复选框'),(219,'C0079','zh-cn','文本框'),(220,'C0088','zh-cn','默认值'),(221,'C0099','zh-cn','请先选择商品分类！'),(222,'C0103','zh-cn','选择商品分类'),(223,'C0104','zh-cn','在商品分类中不存在，请重新输入或选择！'),(224,'C0108','zh-cn','是'),(225,'C0109','zh-cn','否'),(226,'C0111','zh-cn','商品名称'),(227,'C0112','zh-cn','品牌'),(228,'C0113','zh-cn','商品分类'),(229,'C0114','zh-cn','商品图片'),(231,'C0116','zh-cn','商品简介'),(234,'C0142','zh-cn','自动生成'),(235,'C0146','zh-cn','日期'),(236,'M0001','zh-cn','首页'),(237,'M0002','zh-cn','商品&服务'),(238,'M0003','zh-cn','采购管理'),(239,'M0004','zh-cn','物流仓储管理'),(240,'M0005','zh-cn','销售管理'),(241,'M0006','zh-cn','其他'),(243,'M0008','zh-cn','系统设置'),(244,'M0010','zh-cn','商品分类'),(245,'M0011','zh-cn','品牌'),(246,'M0012','zh-cn','商品信息'),(247,'M0013','zh-cn','商品区域定价'),(248,'M0014','zh-cn','商品库存调整'),(249,'M0015','zh-cn','商品属性'),(250,'M0016','zh-cn','销售赠品'),(251,'M0017','zh-cn','商品成本'),(252,'M0018','zh-cn','站点商品信息'),(253,'M0019','zh-cn','商品评价'),(259,'M0025','zh-cn','客户订单处理'),(263,'M0029','zh-cn','客户信息'),(267,'M0033','zh-cn','支付方式'),(268,'M0034','zh-cn','货币及汇率'),(271,'M0037','zh-cn','关键运营参数'),(272,'M0038','zh-cn','销售平台'),(273,'M0039','zh-cn','销售站点模板'),(275,'M0041','zh-cn','多语言维护'),(276,'E0003','zh-cn','上传文件不能为空！'),(277,'C0006','en-us','Login Area'),(279,'C0008','en-us','Email:'),(280,'C0009','en-us','Password:'),(281,'C0010','en-us','Login'),(282,'C0011','en-us','Safety Tips: For security reasons, the system failed login more than 10 times or more users, will be prohibited within 12 hours of landing.'),(283,'C0012','en-us','ECMS-运营管理系统'),(284,'E0001','en-us','E-mail address can not be empty, please re-enter!'),(285,'E0002','en-us','Password can not be empty, please re-enter!'),(286,'C0006','zh-cn','登陆区'),(288,'C0008','zh-cn','邮箱地址:'),(289,'C0009','zh-cn','密码:'),(290,'C0010','zh-cn','登陆'),(291,'C0011','zh-cn','安全提示: 为了安全性考虑，系统登陆失败超过10次以上的用户，将在12小时内禁止登陆。'),(292,'C0012','zh-cn','ECMS-运营管理系统'),(293,'E0001','zh-cn','邮箱地址不能为空，请重新输入！'),(294,'E0002','zh-cn','密码不能为空，请重新输入！'),(295,'C0013','en-us','ECMS'),(296,'C0013','zh-cn','ECMS'),(297,'C0015','en-us','Multi-language Maintenance'),(298,'C0016','en-us','Multi-language Star'),(299,'C0017','en-us','Export Languages Type'),(300,'C0018','en-us','Import Languages Type'),(301,'C0020','en-us','Export'),(302,'C0021','en-us','Import'),(303,'C0022','en-us','ResourceType'),(304,'C0025','en-us','Import Languages Resource'),(305,'C0026','en-us','Language File:'),(306,'C0027','en-us','ECMS-Multi-language Maintenance'),(307,'SysValue_Res','en-us','System Resouce'),(308,'Brand_Res','en-us','Brand'),(309,'BrandType_Res','en-us','Brand Type'),(310,'ProdCategory_Res','en-us','Product Category'),(311,'ProdProperty_Res','en-us','Product Property'),(312,'PropValue_Res','en-us','Property Value'),(313,'SysCurrency_Res','en-us','Currency'),(314,'C0015','zh-cn','多语言维护'),(315,'C0016','zh-cn','多语言统计数据'),(316,'C0017','zh-cn','导出语言种类'),(317,'C0018','zh-cn','导入语言种类'),(318,'C0020','zh-cn','导出资源'),(319,'C0021','zh-cn','导入资源'),(320,'C0022','zh-cn','资源类型'),(321,'C0025','zh-cn','导入语言资源'),(322,'C0026','zh-cn','语言资源文件：'),(323,'C0027','zh-cn','ECMS-多语言维护'),(324,'SysValue_Res','zh-cn','系统内置资源'),(325,'Brand_Res','zh-cn','商品品牌'),(326,'BrandType_Res','zh-cn','品牌分类'),(327,'ProdCategory_Res','zh-cn','商品分类'),(328,'ProdProperty_Res','zh-cn','商品属性库'),(329,'PropValue_Res','zh-cn','属性值'),(330,'SysCurrency_Res','zh-cn','货币'),(331,'C0090','en-us','Category'),(332,'C0091','en-us','Category Tree'),(333,'C0092','en-us','New'),(334,'C0093','en-us','Modify'),(335,'C0094','en-us','Delete'),(336,'C0095','en-us','Move Up'),(337,'C0096','en-us','Move Down'),(338,'C0097','en-us','Type Name'),(339,'C0098','en-us','Superior species'),(340,'C0100','en-us','Whether to remove the classification of goods'),(341,'C0101','en-us','Type name can not be empty, please re-enter！'),(342,'C0102','en-us','ECMS-Category'),(343,'C0090','zh-cn','商品分类'),(344,'C0091','zh-cn','商品分类结构树'),(345,'C0092','zh-cn','新增商品分类'),(346,'C0093','zh-cn','修改商品分类'),(347,'C0094','zh-cn','删除商品分类'),(348,'C0095','zh-cn','上移'),(349,'C0096','zh-cn','下移'),(350,'C0097','zh-cn','分类名称'),(351,'C0098','zh-cn','上级分类'),(352,'C0100','zh-cn','是否删除该商品分类'),(353,'C0101','zh-cn','分类名称不能为空，请重新输入！'),(354,'C0102','zh-cn','ECMS-商品分类'),(355,'C0063','en-us','Product attributes'),(356,'C0065','en-us','List of product attributes'),(357,'C0066','en-us','Add product attributes'),(358,'C0069','en-us','Property Name'),(359,'C0070','en-us','Property Type'),(360,'C0071','en-us','Range'),(361,'C0072','en-us','Multiple values ??using a semicolon () isolation'),(362,'C0074','en-us','Template Name'),(363,'C0075','en-us','Add property'),(364,'C0080','en-us','Modify product attributes'),(365,'C0081','en-us','Whether to remove the product attributes'),(366,'C0082','en-us','Attribute name can not be empty, please re-enter!'),(367,'C0086','en-us','Product attributes can not be empty, please add a property!'),(368,'C0087','en-us','Select the product attributes'),(369,'C0089','en-us','ECMS-Product attributes'),(370,'C0105','en-us','Categories - Properties'),(371,'C0106','en-us','Set extended properties'),(372,'C0107','en-us','SKU attribute set'),(373,'C0110','en-us','Fixed property'),(380,'C0125','en-us','Extended Attributes'),(381,'C0126','en-us','support query'),(383,'C0128','en-us','SKU attributes'),(384,'C0129','en-us','View Properties'),(385,'C0130','en-us','List of attribute values ??can not be empty, enter！'),(386,'C0063','zh-cn','属性定义'),(387,'C0065','zh-cn','属性列表'),(388,'C0066','zh-cn','新增属性'),(389,'C0069','zh-cn','属性名称'),(390,'C0070','zh-cn','属性类型'),(391,'C0071','zh-cn','属性值列表'),(392,'C0072','zh-cn','多个值之间采用逗号(,)隔离'),(393,'C0074','zh-cn','模板名称'),(394,'C0075','zh-cn','添加属性'),(395,'C0080','zh-cn','修改属性'),(396,'C0081','zh-cn','是否删除该属性'),(397,'C0082','zh-cn','属性名称不能为空，请重新输入！'),(398,'C0086','zh-cn','属性不能为空，请添加！'),(399,'C0087','zh-cn','选择属性'),(400,'C0089','zh-cn','ECMS-商品属性'),(401,'C0105','zh-cn','关联商品分类-属性'),(402,'C0106','zh-cn','维护详细参数'),(403,'C0107','zh-cn','维护关键属性'),(404,'C0110','zh-cn','基本属性'),(411,'C0125','zh-cn','详细参数'),(412,'C0126','zh-cn','关键属性'),(414,'C0128','zh-cn','SKU属性'),(415,'C0129','zh-cn','查看属性'),(416,'C0130','zh-cn','属性值列表不能为空，请输入！'),(417,'C0131','en-us','Currency'),(418,'C0132','en-us','Exchange rate'),(419,'C0133','en-us','Currency list'),(420,'C0134','en-us','New Currency'),(421,'C0135','en-us','Currency Name'),(422,'C0136','en-us','Currency abbreviated'),(423,'C0137','en-us','To'),(424,'C0138','en-us','Exchange rate'),(425,'C0139','en-us','ECMS-Currency and exchange rate'),(426,'C0141','en-us','Change currency'),(427,'C0143','en-us','Whether to remove the currency'),(428,'C0144','en-us','Currency name can not be empty, please re-enter！'),(429,'C0145','en-us','Money can not be empty for short, please re-enter！'),(430,'C0147','en-us','Set the exchange rate'),(431,'C0148','en-us','The exchange rate can not be empty, please re-enter！'),(432,'C0131','zh-cn','货币'),(433,'C0132','zh-cn','汇率'),(434,'C0133','zh-cn','货币列表'),(435,'C0134','zh-cn','新增货币'),(436,'C0135','zh-cn','货币名称'),(437,'C0136','zh-cn','货币简写'),(438,'C0137','zh-cn','对'),(439,'C0138','zh-cn','的汇率'),(440,'C0139','zh-cn','ECMS-货币及汇率'),(441,'C0141','zh-cn','修改货币'),(442,'C0143','zh-cn','是否删除该货币'),(443,'C0144','zh-cn','货币名称不能为空，请重新输入！'),(444,'C0145','zh-cn','货币简写不能为空，请重新输入！'),(445,'C0147','zh-cn','设置汇率'),(446,'C0148','zh-cn','汇率不能为空，请重新输入！'),(447,'C0028','en-us','Key Parameter'),(448,'C0031','en-us','Save Parameter'),(449,'C0032','en-us','Support Language：'),(451,'C0034','en-us','Default Language:'),(452,'C0036','en-us','ECMS-Key Parameter'),(453,'C0028','zh-cn','关键参数数据'),(454,'C0031','zh-cn','保存参数'),(455,'C0032','zh-cn','支持语言：'),(457,'C0034','zh-cn','默认语言:'),(458,'C0036','zh-cn','ECMS-关键运营参数'),(459,'C0149','zh-cn','资源数量'),(460,'C0149','en-us','Resource Count'),(461,'C0150','zh-cn','导出语言资源'),(462,'C0150','en-us','Export Resource'),(463,'C0151','zh-cn','保存提示'),(464,'C0151','en-us','Save Alert'),(465,'C0152','zh-cn','支持语言发生改变，系统将对未支持的语言数据进行清理，是否继续执行？'),(466,'C0152','en-us','支持语言发生改变，系统将对未支持的语言数据进行清理，是否继续执行？'),(467,'C0153','zh-cn','（未防止数据丢失，可以点击“备份语言数据”按钮对数据进行备份！）'),(468,'C0153','en-us','（未防止数据丢失，可以点击“备份语言数据”按钮对数据进行备份！）'),(469,'C0154','zh-cn','备份语言数据'),(470,'C0154','en-us','Backup'),(471,'C0155','zh-cn','商品列表'),(472,'C0155','en-us','Product List'),(473,'C0156','zh-cn','选择商品品牌'),(474,'C0156','en-us','choose brand'),(475,'C0157','zh-cn','请选择商品品牌！'),(476,'C0157','en-us','please choose brand!'),(477,'C0158','zh-cn','在商品品牌中不存在，请重新输入！'),(478,'C0158','en-us','is not exist, please re-write!'),(479,'C0159','zh-cn','属性来源'),(480,'C0159','en-us','Property Source'),(481,'C0160','zh-cn','自定义'),(482,'C0160','en-us','defined'),(483,'C0161','zh-cn','系统内置'),(484,'C0161','en-us','System Setting'),(485,'C0162','zh-cn','属性图片'),(486,'C0162','en-us','Property Picture'),(487,'C0163','zh-cn','附带商品图片'),(488,'C0163','en-us','Has'),(489,'C0164','zh-cn','无'),(490,'C0164','en-us','None'),(491,'E0008','zh-cn','该属性作为关键属性被应用于商品数据中，不允许被删除！'),(492,'E0008','en-us','This attribute is used in the product data may not be deleted!'),(493,'E0009','zh-cn','属性值({0})被应用于商品数据中，不允许被移除！'),(494,'E0009','en-us','Attribute value ({0}) is applied to the goods data, not allowed to be removed!'),(495,'E0010','zh-cn','该商品分类下存在商品数据，无法更新其中的商品关键属性！'),(496,'E0010','en-us','The goods classified under commodity data, and can not update one of the key attributes of goods!'),(497,'C0165','zh-cn','商品属性'),(498,'C0165','en-us','Property'),(499,'C0166','zh-cn','商品详细说明'),(500,'C0166','en-us','Detail Description'),(501,'C0167','zh-cn','支持用文字和图片以不同的页面布局来对商品进行详细说明，例如，淘宝中的宝贝详情'),(502,'C0167','en-us','Support a different page layout with text and pictures to commodities'),(503,'E0011','zh-cn','该商品品牌下存在商品数据，不允许被删除！'),(504,'E0011','en-us','This product under the brand name, product data, and not allowed to be deleted!'),(505,'E0012','zh-cn','该商品分类下存在商品数据，不允许被删除！'),(506,'E0012','en-us','Category commodity data, and not allowed to be deleted!'),(507,'E0013','zh-cn','上级分类不允许位于该商品分类内！'),(508,'E0013','en-us','The higher classification is not allowed in the Category!'),(509,'E0014','zh-cn','变更的上级分类与该商品分类或下级商品分类所关联的商品属性存在冲突，不允许变更上级分类！'),(510,'E0014','en-us','The higher level classification of the change there is a conflict with the classification of the merchandise associated with the product attributes are not allowed to change the higher level classification!'),(511,'E0015','zh-cn','该商品分类中存在商品数据，变更后的商品属性与现有商品属性不一致，不允许变更上级分类！'),(512,'E0015','en-us','Category commodity data, change the product attributes are inconsistent with existing product attributes, does not allow changes to a higher level classification.'),(513,'C0168','zh-cn','商品列表'),(514,'C0168','en-us','Product List'),(515,'C0169','zh-cn','商品基本信息'),(516,'C0169','en-us','Product'),(517,'C0170','zh-cn','新增商品'),(518,'C0170','en-us','New Product'),(519,'C0171','zh-cn','查询商品'),(520,'C0171','en-us','Query Product'),(521,'C0172','zh-cn','详细参数'),(522,'C0172','en-us','Paramter'),(523,'C0173','zh-cn','商品详细介绍'),(524,'C0173','en-us','Detail Introduce'),(525,'C0174','zh-cn','SKU单元'),(526,'C0174','en-us','Stock Unit'),(527,'C0175','zh-cn','商品名称'),(528,'C0175','en-us','Product\'s name'),(529,'C0176','zh-cn','库存单位'),(530,'C0176','en-us','Stock Unit'),(531,'C0177','zh-cn','商品状态'),(532,'C0177','en-us','State'),(533,'C0178','zh-cn','临时'),(534,'C0178','en-us','Temp'),(535,'C0179','zh-cn','可销售'),(536,'C0179','en-us','Sale'),(537,'C0180','zh-cn','图片'),(538,'C0180','en-us','Picture'),(539,'C0181','zh-cn','下载图片文件'),(540,'C0181','en-us','down picture'),(541,'C0182','zh-cn','商品简介'),(542,'C0182','en-us','Introduce'),(543,'C0183','zh-cn','商品介绍'),(544,'C0183','en-us','Introduce'),(545,'C0184','zh-cn','关键字'),(546,'C0184','en-us','Keyword'),(547,'C0185','zh-cn','根据商品名称或商品简介中的任意单词进行搜索'),(548,'C0185','en-us','Search based on any word in the commodity name or commodity Profile'),(549,'C0186','zh-cn','所有分类'),(550,'C0186','en-us','All Categories'),(551,'C0187','zh-cn','（默认为所有分类，如果需要指定商品分类，请选择主窗体左边区域的商品分类）'),(552,'C0187','en-us','(The default for all classifications, if you need to specify a Category, select the main form on the left of the region\'s merchandise classification)'),(553,'C0188','zh-cn','库存量'),(554,'C0188','en-us','Inventory'),(555,'C0189','zh-cn','请先选择左边区域的商品分类！'),(556,'C0189','en-us','Please select a region on the left Category!'),(557,'C0190','zh-cn','修改商品'),(558,'C0190','en-us','Modify Product'),(559,'C0191','zh-cn','空'),(560,'C0191','en-us','None'),(561,'C0192','zh-cn','是否删除该商品'),(562,'C0192','en-us','Whether or not to remove the product'),(563,'C0193','zh-cn','不能为空，请输入！'),(564,'C0193','en-us','can not be empty, please enter!'),(565,'C0194','zh-cn','商品编码'),(566,'C0194','en-us','Product Code'),(567,'C0195','zh-cn','商品名称不能为空，请输入！'),(568,'C0195','en-us','Product name can not be empty, please enter!'),(569,'C0196','zh-cn','无选项'),(570,'C0196','en-us','No Options'),(571,'C0197','zh-cn','查看商品信息'),(572,'C0197','en-us','View product information'),(573,'E0016','zh-cn','变更的商品分类关联的属性与现有的商品属性结构不一致，不允许变更商品分类！'),(574,'E0016','en-us','Change the classification of goods associated properties are inconsistent with existing product attributes structure, do not allow to change the Category!'),(575,'C0198','zh-cn','ECMS-商品信息'),(576,'C0198','en-us','ECMS-Product'),(577,'C0199','zh-cn','ECMS-销售平台'),(578,'C0199','en-us','ECMS-ShoppingSite'),(579,'C0200','zh-cn','ECMS-站点商品信息'),(580,'C0200','en-us','ECMS-SalePrice'),(581,'C0201','zh-cn','ECMS-商品评价'),(582,'C0201','en-us','ECMS-SpreadStragety'),(583,'M0042','zh-cn','宣传海报'),(584,'M0042','en-us','Disseminate'),(585,'E0017','zh-cn','销售平台的支持语言数据中包含\'{0}\'，该语言不允许在支持语言中被清理'),(586,'E0017','en-us','Shopping sites to support language data contained in \'{0}\', the language does not allow to be cleaned in the supported languages'),(856,'E0018','zh-cn','销售平台的结算货币数据中包含\'{0}\'，该货币不允许被删除'),(857,'E0018','en-us','Shopping site support monetary data contain \'{0}\', does not allow the currency to support currencies cleanup'),(859,'E0019','zh-cn','该货币名称已经在系统中存在，请重新输入！'),(860,'E0019','en-us','The currency name already exists in the system, please re-enter!'),(862,'E0020','zh-cn','该销售平台已经在系统中存在，请重新输入！'),(863,'E0020','en-us','The shopping site has been present in the system, please re-enter!'),(865,'C0202','zh-cn','货币符号'),(866,'C0202','en-us','Currency symbol'),(868,'C0203','zh-cn','货币符号不能为空，请输入！'),(869,'C0203','en-us','The currency symbol can not be empty, please enter!'),(871,'C0204','zh-cn','标准售价'),(872,'C0204','en-us','Saleprice'),(875,'E0021','zh-cn','该快递公司已经在系统中存在，请重新输入！'),(876,'E0021','en-us','The Express Company has been present in the system, please re-enter!'),(877,'E0022','zh-cn','该区域已经在系统中存在，请重新输入！'),(878,'E0022','en-us','The Area has been present in the system, please re-enter!'),(903,'C0214','zh-cn','全球区域列表'),(904,'C0214','en-us','List of areas'),(905,'C0215','zh-cn','新增片区/国家'),(906,'C0215','en-us','New area'),(907,'C0216','zh-cn','修改片区/国家'),(908,'C0216','en-us','Modify area'),(909,'C0217','zh-cn','删除片区/国家'),(910,'C0217','en-us','Delete area'),(911,'C0218','zh-cn','快递公司列表'),(912,'C0218','en-us','List of courier companies'),(913,'C0219','zh-cn','创建新快递公司'),(914,'C0219','en-us','New courier companies'),(915,'C0220','zh-cn','区域名称'),(916,'C0220','en-us','Zone name'),(917,'C0221','zh-cn','上级区域'),(918,'C0221','en-us','Superior region'),(937,'C0231','zh-cn','是否删除该快递公司'),(938,'C0231','en-us','Whether or not to remove the courier company'),(939,'C0232','zh-cn','快递公司不能为空，请重新输入！'),(940,'C0232','en-us','The courier companies can not be empty, please re-enter!'),(941,'C0233','zh-cn','在全球区域列表中不存在,请重新输入！'),(942,'C0233','en-us','does not exist in the regional list, please re-enter!'),(943,'C0234','zh-cn','请先选择区域!'),(944,'C0234','en-us','Please select the Express area.'),(945,'C0235','zh-cn','是否删除该区域'),(946,'C0235','en-us','Whether or not to remove the courier area'),(947,'C0236','zh-cn','区域名称不能为空，请重新输入！'),(948,'C0236','en-us','The zone name can not be empty, please re-enter!'),(949,'C0237','zh-cn','选择区域'),(950,'C0237','en-us','Select the Express area'),(953,'C0239','zh-cn','区域类型'),(954,'C0239','en-us','Area Type'),(955,'C0240','zh-cn','国家'),(956,'C0240','en-us','Country'),(957,'C0241','zh-cn','省份 | 直辖市'),(958,'C0241','en-us','Province'),(959,'E0027','zh-cn','该快递公司被应用于销售平台中，不允许删除！'),(960,'E0027','en-us','The courier company is applied to the shopping site and not allowed to delete'),(961,'E0028','zh-cn','该区域或下级区域被应用于销售平台中，不允许删除！'),(962,'E0028','en-us','The regional or sub regional shopping site and not allowed to delete!'),(963,'E0029','zh-cn','该商品属性已经存在，不能进行添加！'),(964,'E0029','en-us','This product attribute already exists, can not be added!'),(965,'C0242','zh-cn','是否删除该商品分类-属性？'),(966,'C0242','en-us','Whether to remove the Category - property?'),(967,'C0243','zh-cn','属性值列表不能为空，请重新输入！'),(968,'C0243','en-us','The list of attribute values ??can not be empty, please re-enter!'),(969,'E0030','zh-cn','该商品已经在系统中存在，请重新输入！'),(970,'E0030','en-us','This product is already in the system, please re-enter'),(971,'C0244','zh-cn','添加商品分类-属性'),(972,'C0244','en-us','Add Category-Properties'),(973,'C0245','zh-cn','修改商品分类-属性'),(974,'C0245','en-us','Modify Category-Properties'),(975,'C0246','zh-cn','属性值来源'),(976,'C0246','en-us','Attribute value source'),(977,'C0247','zh-cn','(在具体的商品信息中进行填写)'),(978,'C0247','en-us','(To fill in the specific product information)'),(979,'C0248','zh-cn','手工输入'),(980,'C0248','en-us','Manual input'),(981,'E0031','zh-cn','该属性存在于该商品分类的下层数据中，不能进行添加！'),(982,'E0031','en-us','The property exists in the commodity classification of the underlying data can not be added!'),(983,'C0249','zh-cn','图片列表'),(984,'C0249','en-us','List of images'),(985,'C0250','zh-cn','包裹重量'),(986,'C0250','en-us','Express the weight'),(987,'C0251','zh-cn','清理所有图片'),(988,'C0251','en-us','Clean up all the pictures'),(989,'C0252','zh-cn','添加图片'),(990,'C0252','en-us','Upload pictures'),(991,'C0253','zh-cn','商品详细介绍支持html代码，html代码请在专业网页编辑软件(例如：Dreamware)中进行编辑'),(992,'C0253','en-us','Details to support html code, html code in professional web editing software (such as the: Dreamware) edit'),(993,'C0254','zh-cn','查看可选择的图片'),(994,'C0254','en-us','Pictures Manage'),(995,'C0255','zh-cn','预览'),(996,'C0255','en-us','Preview'),(997,'C0256','zh-cn','支持单张图片或zip格式的图片压缩包'),(998,'C0256','en-us','Support a single picture or zip format image compression package'),(999,'C0257','zh-cn','指定颜色'),(1000,'C0257','en-us','Specify the color'),(1001,'C0258','zh-cn','图片&文件列表'),(1002,'C0258','en-us','Picture & list of files'),(1003,'C0259','zh-cn','上传'),(1004,'C0259','en-us','Upload'),(1005,'C0260','zh-cn','图片&文件'),(1006,'C0260','en-us','Pictures & Files'),(1007,'C0261','zh-cn','是否通用'),(1008,'C0261','en-us','Whether the generic'),(1009,'C0262','zh-cn','主图'),(1010,'C0262','en-us','Main Picture'),(1011,'C0263','zh-cn','辅助图'),(1012,'C0263','en-us','Auxiliary Graph'),(1013,'C0264','zh-cn','修改图片'),(1014,'C0264','en-us','Modify picture'),(1015,'C0265','zh-cn','是否清理所有图片?'),(1016,'C0265','en-us','Whether or not to clean up all the pictures?'),(1017,'C0266','zh-cn','是否删除该图片?'),(1018,'C0266','en-us','Delete the picture?'),(1019,'C0267','zh-cn','图片&文件管理'),(1020,'C0267','en-us','Picture & Document Management'),(1021,'C0268','zh-cn','存放路径'),(1022,'C0268','en-us','Storage path'),(1023,'C0269','zh-cn','上传图片&文件'),(1024,'C0269','en-us','Upload pictures & files'),(1025,'C0270','zh-cn','是否删除该图片&文件?'),(1026,'C0270','en-us','Whether to delete the pictures & documents?'),(1027,'C0271','zh-cn','界面预览'),(1028,'C0271','en-us','Commodity in detail introduced preview'),(1029,'C0272','zh-cn','ECMS-客户档案'),(1030,'C0272','en-us','ECMS-Customer'),(1031,'M0043','zh-cn','全球区域'),(1032,'M0043','en-us','Global Area'),(1033,'C0273','zh-cn','ECMS-全球区域'),(1034,'C0273','en-us','ECMS-Global Area'),(1035,'C0274','zh-cn','商品仓储'),(1036,'C0274','en-us','Product Storage'),(1037,'C0275','zh-cn','商品入库'),(1038,'C0275','en-us','StockIn'),(1039,'C0276','zh-cn','商品出库'),(1040,'C0276','en-us','StockOut'),(1041,'C0277','zh-cn','物流快递公司'),(1042,'C0277','en-us','ExpressCompany'),(1043,'C0278','zh-cn','ECMS-物流快递公司'),(1044,'C0278','en-us','ECMS-ExpressCompany'),(1047,'C0279','zh-cn','添加快递条目'),(1048,'C0279','en-us','Add Express entry'),(1049,'C0280','zh-cn','快递路由'),(1050,'C0280','en-us','Express route'),(1051,'C0281','zh-cn','修改快递条目'),(1052,'C0281','en-us','Modify Express entry'),(1053,'C0282','zh-cn','修改该快递公司'),(1054,'C0282','en-us','Modify ExpressCompany'),(1055,'C0283','zh-cn','删除该快递公司'),(1056,'C0283','en-us','Delete ExpressCompany'),(1057,'C0284','zh-cn','相关协议及附件'),(1058,'C0284','en-us','Relation Attached'),(1059,'C0285','zh-cn','历史合作情况'),(1060,'C0285','en-us','History of cooperation'),(1061,'C0286','zh-cn','基本信息'),(1062,'C0286','en-us','BasicInfo'),(1063,'C0287','zh-cn','添加协议/附件'),(1064,'C0287','en-us','Add protocol / Accessories'),(1065,'C0288','zh-cn','详细列表'),(1066,'C0288','en-us','Detailed list'),(1067,'C0289','zh-cn','相关说明'),(1068,'C0289','en-us','Instructions'),(1069,'C0290','zh-cn','发货地'),(1070,'C0290','en-us','Delivery to'),(1071,'C0291','zh-cn','目的地'),(1072,'C0291','en-us','Destination'),(1073,'C0292','zh-cn','暂无合作关系'),(1074,'C0292','en-us','No cooperation between'),(1075,'C0293','zh-cn','快递路由不能为空,请重新输入!'),(1076,'C0293','en-us','Express route can not be empty, please re-enter!'),(1077,'C0294','zh-cn','发货地不能为空,请重新输入!'),(1078,'C0294','en-us','Shipped to can not be empty, please re-enter!'),(1079,'C0295','zh-cn','目的地不能为空,请重新输入!'),(1080,'C0295','en-us','The destination can not be empty, please re-enter!'),(1081,'C0296','zh-cn','附件名称'),(1082,'C0296','en-us','Attachment Name'),(1083,'C0297','zh-cn','序号超出该列表范围,请重新输入!'),(1084,'C0297','en-us','Number beyond the scope of the list, please re-enter!'),(1085,'C0298','zh-cn','修改协议/附件'),(1086,'C0298','en-us','To amend the agreement / Accessories'),(1087,'C0299','zh-cn','是否删除该协议/附件'),(1088,'C0299','en-us','Whether or not to remove the protocol / Accessories'),(1089,'C0300','zh-cn','附件名称不能为空,请重新输入!'),(1090,'C0300','en-us','The attachment name can not be empty, please re-enter!'),(1091,'C0301','zh-cn','相关协议及附件不能为空,请重新输入!'),(1092,'C0301','en-us','Agreement and attachments can not be empty, please re-enter!'),(1093,'C0302','zh-cn','请先创建快递公司!'),(1094,'C0302','en-us','Please create a courier company!'),(1095,'M0044','zh-cn','系统用户'),(1096,'M0044','en-us','System User'),(1097,'C0303','zh-cn','ECMS-系统用户管理'),(1098,'C0303','en-us','ECMS-System User'),(1099,'C0304','zh-cn','查询用户'),(1100,'C0304','en-us','Query User'),(1101,'C0305','zh-cn','新增用户'),(1102,'C0305','en-us','New User'),(1103,'C0306','zh-cn','用户列表'),(1104,'C0306','en-us','User List'),(1105,'C0307','zh-cn','数据权限'),(1106,'C0307','en-us','Data permission'),(1107,'C0308','zh-cn','系统权限'),(1108,'C0308','en-us','System privileges'),(1109,'C0309','zh-cn','用户名'),(1110,'C0309','en-us','UserName'),(1111,'C0310','zh-cn','邮箱'),(1112,'C0310','en-us','Email'),(1113,'C0311','zh-cn','联系电话'),(1114,'C0311','en-us','Telephone'),(1115,'C0312','zh-cn','其他联系方式'),(1116,'C0312','en-us','Other contact'),(1117,'C0313','zh-cn','销售平台'),(1118,'C0313','en-us','Internet sales platform'),(1119,'C0314','zh-cn','负责的区域'),(1120,'C0314','en-us','Area of ??responsibility'),(1121,'C0315','zh-cn','修改用户'),(1122,'C0315','en-us','Modify User'),(1123,'C0316','zh-cn','是否删除该用户'),(1124,'C0316','en-us','Whether or not to delete the user'),(1125,'C0317','zh-cn','用户名不能为空,请重新输入!'),(1126,'C0317','en-us','The user name can not be empty, please re-enter!'),(1127,'C0318','zh-cn','邮箱不能为空,请重新输入!'),(1128,'C0318','en-us','E-mail can not be empty, please re-enter!'),(1129,'E0032','zh-cn','旧密码不正确,请重新输入!'),(1130,'E0032','en-us','The old password is incorrect, please re-enter!'),(1131,'C0319','zh-cn','个人信息'),(1132,'C0319','en-us','Personal Information'),(1133,'C0320','zh-cn','设置新密码'),(1134,'C0320','en-us','Set a new password'),(1135,'C0321','zh-cn','旧密码不能为空,请重新输入!'),(1136,'C0321','en-us','The old password can not be empty, please re-enter!'),(1137,'C0322','zh-cn','新密码不能为空,请重新输入!'),(1138,'C0322','en-us','The new password can not be empty, please re-enter!'),(1139,'C0323','zh-cn','确认密码与新密码不一致,请重新输入!'),(1140,'C0323','en-us','Confirm password is inconsistent with the new password, please re-enter!'),(1141,'C0324','zh-cn','密码修改成功!'),(1142,'C0324','en-us','Password changed successfully!'),(1143,'C0325','zh-cn','密码'),(1144,'C0325','en-us','Password'),(1145,'C0326','zh-cn','旧密码'),(1146,'C0326','en-us','Old Password'),(1147,'C0327','zh-cn','新密码'),(1148,'C0327','en-us','New Password'),(1149,'C0328','zh-cn','确认密码'),(1150,'C0328','en-us','Confirm Password'),(1151,'C0329','zh-cn','发送密码到邮箱'),(1152,'C0329','en-us','sent to the mailbox'),(1153,'C0330','zh-cn','设置新密码'),(1154,'C0330','en-us','Set a new password'),(1155,'C0331','zh-cn','邮箱和密码错误，请重新输入！'),(1156,'C0331','en-us','E-mail and the password is incorrect, please re-enter!'),(1157,'C0332','zh-cn','不支持在此商品分类下调整顺序'),(1158,'C0332','en-us','Adjust the order is not supported in this Category'),(1159,'C0333','zh-cn','该商品在多个商品分类下都存在,此操作将删除所有分类下的该商品数据,是否继续?'),(1160,'C0333','en-us','The goods under more than one Category, this operation will delete all classified under the product data you wish to continue?'),(1161,'C0334','zh-cn','网站模板'),(1162,'C0334','en-us','Site template'),(1163,'C0335','zh-cn','销售平台列表'),(1164,'C0335','en-us','Sales platform list'),(1165,'C0336','zh-cn','新增销售平台'),(1166,'C0336','en-us','New sales platform'),(1167,'C0337','zh-cn','平台数据同步设置'),(1168,'C0337','en-us','Server settings'),(1169,'C0338','zh-cn','销售平台'),(1170,'C0338','en-us','Sales platform name'),(1171,'C0339','zh-cn','支持语言'),(1172,'C0339','en-us','Supported languages'),(1173,'C0340','zh-cn','结算货币'),(1174,'C0340','en-us','Support currency'),(1175,'C0341','zh-cn','首选语言'),(1176,'C0341','en-us','Preferred language'),(1177,'C0342','zh-cn','首选货币'),(1178,'C0342','en-us','Preferred currency'),(1179,'C0343','zh-cn','销售国家'),(1180,'C0343','en-us','Sales area'),(1181,'C0344','zh-cn','网址'),(1182,'C0344','en-us','Website'),(1183,'C0345','zh-cn','程序存放目录'),(1184,'C0345','en-us','Program storage directory'),(1185,'C0346','zh-cn','Ftp用户'),(1186,'C0346','en-us','Ftp user'),(1187,'C0347','zh-cn','Ftp密码'),(1188,'C0347','en-us','Ftp password'),(1189,'C0348','zh-cn','运行状态'),(1190,'C0348','en-us','Operating status'),(1191,'C0349','zh-cn','最后部署时间'),(1192,'C0349','en-us','Last deployment time'),(1193,'C0350','zh-cn','发布'),(1194,'C0350','en-us','Release'),(1195,'C0351','zh-cn','未上线'),(1196,'C0351','en-us','No on-line'),(1197,'C0352','zh-cn','查看销售平台'),(1198,'C0352','en-us','View sales platform'),(1199,'C0353','zh-cn','修改销售平台'),(1200,'C0353','en-us','Modify sales platform'),(1201,'C0354','zh-cn','是否删除该销售平台'),(1202,'C0354','en-us','Whether or not to remove the sales platform'),(1203,'C0355','zh-cn','销售平台不能为空！'),(1204,'C0355','en-us','Sales platform name can not be empty!'),(1205,'C0356','zh-cn','操作提示'),(1206,'C0356','en-us','Operation Alert'),(1207,'C0357','zh-cn','请先创建销售平台！'),(1208,'C0357','en-us','Please create a sales platform!'),(1209,'E0033','zh-cn','该客户分组下存在客户数据,不允许删除！'),(1210,'E0033','en-us','The customer data, customer grouping allowed to delete!'),(1211,'E0034','zh-cn','该客户分组已经在系统中存在，请重新输入！'),(1212,'E0034','en-us','The client packet has been present in the system, please re-enter!'),(1213,'E0035','zh-cn','该客户已经在系统中存在，请重新输入！'),(1214,'E0035','en-us','The customer already exists in the system, please re-enter!'),(1215,'C0358','zh-cn','客户群'),(1216,'C0358','en-us','Customer Group'),(1217,'C0359','zh-cn','客户列表'),(1218,'C0359','en-us','List of customers'),(1219,'C0360','zh-cn','查询客户'),(1220,'C0360','en-us','Query Customer'),(1221,'C0361','zh-cn','新增客户'),(1222,'C0361','en-us','New Customer'),(1223,'C0362','zh-cn','客户群列表'),(1224,'C0362','en-us','Customer base list'),(1225,'C0363','zh-cn','新增客户群'),(1226,'C0363','en-us','New customer base'),(1227,'C0364','zh-cn','客户名称'),(1228,'C0364','en-us','Customer Name'),(1229,'C0365','zh-cn','手机'),(1230,'C0365','en-us','Mobile'),(1231,'C0366','zh-cn','固定电话'),(1232,'C0366','en-us','Fixed telephone'),(1233,'C0367','zh-cn','状态'),(1234,'C0367','en-us','State'),(1235,'C0368','zh-cn','ECMS-客户档案'),(1236,'C0368','en-us','ECMS-Customer'),(1237,'C0369','zh-cn','消费单数'),(1238,'C0369','en-us','Consumption of the singular'),(1239,'C0370','zh-cn','消费总额'),(1240,'C0370','en-us','Total amount of spending'),(1241,'C0371','zh-cn','客户数量'),(1242,'C0371','en-us','The number of customers'),(1243,'C0372','zh-cn','修改客户群'),(1244,'C0372','en-us','Modify the customer base'),(1245,'C0373','zh-cn','是否删除该客户群'),(1246,'C0373','en-us','Whether or not to delete the customer base'),(1247,'C0374','zh-cn','客户群不能为空,请输入!'),(1248,'C0374','en-us','The customer base can not be empty, please enter!'),(1249,'C0375','zh-cn','临时'),(1250,'C0375','en-us','Temporary'),(1251,'C0376','zh-cn','正式'),(1252,'C0376','en-us','Official'),(1253,'C0377','zh-cn','修改客户'),(1254,'C0377','en-us','Modify Customer'),(1255,'C0378','zh-cn','是否删除该客户'),(1256,'C0378','en-us','Whether or not to delete the customer'),(1257,'C0379','zh-cn','客户名称不能为空,请输入!'),(1258,'C0379','en-us','Customer Name can not be empty, please enter!'),(1259,'C0380','zh-cn','邮箱不能为空,请输入!'),(1260,'C0380','en-us','E-mail can not be empty, please enter!'),(1261,'C0381','zh-cn','手机不能为空,请输入!'),(1262,'C0381','en-us','The phone can not be empty, please enter!'),(1263,'C0382','zh-cn','批量删除商品'),(1264,'C0382','en-us','Batch Delete Product'),(1265,'C0383','zh-cn','批量修改商品'),(1266,'C0383','en-us','Batch Modify Product'),(1267,'C0384','zh-cn','待批量删除的商品数据有'),(1268,'C0384','en-us','Bulk deletion of data'),(1269,'C0385','zh-cn','待批量修改的商品数据有'),(1270,'C0385','en-us','Data you want to bulk modify product'),(1271,'C0386','zh-cn','条('),(1272,'C0386','en-us','Article('),(1273,'C0387','zh-cn',')，是否全部删除这些数据？'),(1274,'C0387','en-us','),Delete all the data?'),(1275,'C0388','zh-cn','维护详细列表'),(1276,'C0388','en-us','Maintain a detailed list'),(1277,'C0389','zh-cn','下载图片'),(1278,'C0389','en-us','Download picture'),(1279,'C0390','zh-cn','待删除的商品数据不存在！'),(1280,'C0390','en-us','Item data does not exist to be deleted!'),(1281,'C0391','zh-cn','无待删除的商品数据！'),(1282,'C0391','en-us','No data to be deleted!'),(1283,'C0392','zh-cn','待修改的商品数据不存在！'),(1284,'C0392','en-us','To modify data does not exist!'),(1285,'C0393','zh-cn','无待修改的商品数据！'),(1286,'C0393','en-us','No data you want to modify the goods!'),(1287,'C0394','zh-cn','商品分类不允许为空，请输入！'),(1288,'C0394','en-us','Commodity classification is not allowed to be empty, please enter!'),(1289,'C0395','zh-cn','选择商品'),(1290,'C0395','en-us','Choose Product'),(1291,'C0396','zh-cn','最后更新人'),(1292,'C0396','en-us','LastUpdatedBy'),(1293,'C0397','zh-cn','最后更新时间'),(1294,'C0397','en-us','LastUpdatedTime'),(1295,'C0398','zh-cn','商品状态'),(1296,'C0398','en-us','State'),(1297,'C0399','zh-cn','未发布'),(1298,'C0399','en-us','UnUpload'),(1299,'C0400','zh-cn','上架'),(1300,'C0400','en-us','Upload'),(1301,'C0401','zh-cn','下架'),(1302,'C0401','en-us','Down'),(1303,'C0402','zh-cn','商品图片'),(1304,'C0402','en-us','Product Pic'),(1305,'C0403','zh-cn','所有'),(1306,'C0403','en-us','All'),(1307,'C0404','zh-cn','单图'),(1308,'C0404','en-us','Single'),(1309,'C0405','zh-cn','多图'),(1310,'C0405','en-us','Multi'),(1311,'C0406','zh-cn','无图片'),(1312,'C0406','en-us','None'),(1313,'C0407','zh-cn','浏览图宽度'),(1314,'C0407','en-us','Width'),(1315,'C0408','zh-cn','浏览图高度'),(1316,'C0408','en-us','Height'),(1317,'E0036','zh-cn','所选商品分类之间的浏览图尺寸不一致，请核对商品分类的尺寸！'),(1318,'E0036','en-us','Product Category is worry'),(1319,'C0409','zh-cn','横向列表视图'),(1320,'C0409','en-us','ListView'),(1321,'C0410','zh-cn','无商品数据展示！'),(1322,'C0410','en-us','No Product'),(1323,'C0411','zh-cn','查看品牌信息'),(1324,'C0411','en-us','View Brand'),(1325,'C0412','zh-cn','到'),(1326,'C0412','en-us','To'),(1327,'E0037','zh-cn','该运费策略在系统中已经存在，请重新输入！'),(1328,'E0037','en-us','The freight strategy in the system already exists, please re-enter!'),(1329,'C0413','zh-cn','语言'),(1330,'C0413','en-us','Language'),(1331,'C0414','zh-cn','站点列表'),(1332,'C0414','en-us','Pricing area list'),(1333,'C0415','zh-cn','添加站点'),(1334,'C0415','en-us','Add pricing area'),(1335,'C0416','zh-cn','站点'),(1336,'C0416','en-us','Pricing area'),(1337,'C0417','zh-cn','覆盖国家'),(1338,'C0417','en-us','Countries covered'),(1339,'C0418','zh-cn','支持语言'),(1340,'C0418','en-us','Site language'),(1341,'C0419','zh-cn','价格货币'),(1342,'C0419','en-us','Pricing Currency'),(1343,'C0420','zh-cn','如果以下国家列表为空，则默认为全球'),(1344,'C0420','en-us','If the following list of countries is empty, it defaults to the global'),(1345,'C0421','zh-cn','全球'),(1346,'C0421','en-us','Global'),(1347,'C0422','zh-cn','该结算货币在价格货币范围内，不能被取消！'),(1348,'C0422','en-us','The settlement currency in the the pricing currency within, can not be canceled!'),(1349,'C0423','zh-cn','该销售平台的站点已经覆盖全球，无法添加其他站点！'),(1350,'C0423','en-us','The pricing of the sales platform area have global coverage, and not be able to add additional pricing area!'),(1351,'C0424','zh-cn','修改站点'),(1352,'C0424','en-us','Modify the pricing area'),(1353,'C0425','zh-cn','是否删除该站点'),(1354,'C0425','en-us','Do you want to delete the pricing area'),(1355,'C0426','zh-cn','站点不能为空，请重新输入！'),(1356,'C0426','en-us','Pricing region can not be empty, please re-enter!'),(1357,'C0427','zh-cn','站点已经在系统中存在，请重新输入！'),(1358,'C0427','en-us','The pricing area already exists in the system, please re-enter!'),(1359,'C0428','zh-cn','该站点中的覆盖国家已经在系统中存在，请重新输入！'),(1360,'C0428','en-us','The pricing area countries already exists in the system, please re-enter!'),(1361,'C0429','zh-cn','该站点的覆盖国家不允许设置为全球，该范围与现有的覆盖国家存在冲突，请重新输入！'),(1362,'C0429','en-us','The pricing area covering countries do not allow to set for the world, the scope of coverage with existing national conflict, please re-enter!'),(1363,'M0045','zh-cn','站点配送服务'),(1364,'M0045','en-us','Express Service'),(1365,'C0430','zh-cn','ECMS-站点配送服务'),(1366,'C0430','en-us','ECMS-Express Service'),(1367,'C0431','zh-cn','站点配送服务'),(1368,'C0431','en-us','Commodity distribution services'),(1369,'C0432','zh-cn','配送服务列表'),(1370,'C0432','en-us','Distribution services list'),(1371,'C0433','zh-cn','查询配送服务'),(1372,'C0433','en-us','Query distribution services'),(1373,'C0434','zh-cn','新增配送服务'),(1374,'C0434','en-us','New delivery service'),(1375,'C0435','zh-cn','服务说明'),(1376,'C0435','en-us','Help'),(1377,'C0436','zh-cn','配送服务'),(1378,'C0436','en-us','Distribution services'),(1379,'C0437','zh-cn','配送地点'),(1380,'C0437','en-us','Distribution locations'),(1381,'C0438','zh-cn','商品首重'),(1382,'C0438','en-us','The commodity First weight limit'),(1383,'C0439','zh-cn','增重'),(1384,'C0439','en-us','Increase Weight'),(1385,'C0440','zh-cn','最大限重'),(1386,'C0440','en-us','Maximum weight limit'),(1387,'C0441','zh-cn','配送时效'),(1388,'C0441','en-us','Distribution aging'),(1389,'C0442','zh-cn','价格列表'),(1390,'C0442','en-us','Price list'),(1391,'C0443','zh-cn','添加价格'),(1392,'C0443','en-us','Add Price'),(1393,'C0444','zh-cn','首重运费'),(1394,'C0444','en-us','The first heavy freight'),(1395,'C0445','zh-cn','增重运费'),(1396,'C0445','en-us','Weight gain freight'),(1397,'C0446','zh-cn','快递运费'),(1398,'C0446','en-us','Express shipping'),(1399,'C0447','zh-cn','新增配送服务'),(1400,'C0447','en-us','New delivery service'),(1401,'C0448','zh-cn','修改配送服务'),(1402,'C0448','en-us','Modify the distribution services'),(1403,'C0449','zh-cn','是否删除该配送服务'),(1404,'C0449','en-us','Do you want to delete the delivery service'),(1405,'C0450','zh-cn','查看配送服务'),(1406,'C0450','en-us','View distribution services'),(1407,'C0451','zh-cn','不能为空，请重新输入!'),(1408,'C0451','en-us','can not be empty, please re-enter!'),(1409,'C0452','zh-cn','最大重量限制必须大于或等于商品首重+增重，请重新输入！'),(1410,'C0452','en-us','Maximum weight limit must be greater than or equal to the first heavy merchandise + weight gain, please re-enter!'),(1411,'C0453','zh-cn','修改价格'),(1412,'C0453','en-us','Modify the price'),(1413,'C0454','zh-cn','是否删除该服务价格'),(1414,'C0454','en-us','Do you want to delete the price of the service'),(1415,'C0455','zh-cn','查询配送服务'),(1416,'C0455','en-us','Query distribution services'),(1417,'C0456','zh-cn','商品经营范围'),(1418,'C0456','en-us','Operating range of goods'),(1419,'C0457','zh-cn','所有商品'),(1420,'C0457','en-us','All Products'),(1421,'C0458','zh-cn','指定商品分类'),(1422,'C0458','en-us','Designated Category'),(1423,'C0459','zh-cn','指定商品分类和品牌'),(1424,'C0459','en-us','Category and Brand'),(1425,'E0038','zh-cn','该配送服务已经存在，请重新输入！'),(1426,'E0038','en-us','The distribution services already exist, please re-enter!'),(1427,'C0460','zh-cn','城市'),(1428,'C0460','en-us','City'),(1429,'C0461','zh-cn','新增'),(1430,'C0461','en-us','New'),(1431,'C0462','zh-cn','修改'),(1432,'C0462','en-us','Modify'),(1433,'C0463','zh-cn','列表'),(1434,'C0463','en-us','List'),(1435,'C0464','zh-cn','是否删除该'),(1436,'C0464','en-us','Is delete'),(1437,'E0039','zh-cn','该配送地点已经存在，请重新输入！'),(1438,'E0039','en-us','The delivery location already exists, please re-enter!'),(1439,'E0040','zh-cn','该配置地点正在被应用在配送服务中，不允许删除！'),(1440,'E0040','en-us','The configuration location is being applied in the distribution services, not allowed to delete!'),(1441,'C0465','zh-cn','配送服务模板'),(1442,'C0465','en-us','Distribution services template'),(1443,'C0466','zh-cn','模板名称'),(1444,'C0466','en-us','Template name'),(1445,'C0467','zh-cn','站点'),(1446,'C0467','en-us','Shopping site'),(1447,'C0468','zh-cn','配送服务'),(1448,'C0468','en-us','Commodity distribution services'),(1449,'C0469','zh-cn','添加服务'),(1450,'C0469','en-us','Add Service'),(1451,'C0470','zh-cn','查看详细信息'),(1452,'C0470','en-us','View Details'),(1453,'C0471','zh-cn','是否默认服务'),(1454,'C0471','en-us','Whether the default service'),(1455,'C0472','zh-cn','是否免运费'),(1456,'C0472','en-us','Whether free shipping'),(1457,'C0473','zh-cn','影响区域'),(1458,'C0473','en-us','Area of ​​influence'),(1459,'C0474','zh-cn','区域覆盖率'),(1460,'C0474','en-us','Regional coverage'),(1461,'C0475','zh-cn','请选择配送地点!'),(1462,'C0475','en-us','Please select a delivery location!'),(1463,'C0476','zh-cn','这些区域'),(1464,'C0476','en-us','These areas'),(1465,'C0477','zh-cn','从'),(1466,'C0477','en-us','From'),(1467,'C0478','zh-cn','之间配送服务不存在，如要定义，请在“配送服务”中进行维护！'),(1468,'C0478','en-us','Between delivery service does not exist, if you want to define, and distribution services maintenance!'),(1469,'C0479','zh-cn','之间的所有配送服务已经存在于以下列表中！'),(1470,'C0479','en-us','Between all distribution service already exists in the list below!'),(1471,'C0480','zh-cn','修改服务'),(1472,'C0480','en-us','Modify server'),(1473,'C0481','zh-cn','全选/反选'),(1474,'C0481','en-us','Select / unselect'),(1475,'C0482','zh-cn','是否删除该配送服务'),(1476,'C0482','en-us','Do you want to delete the distribution services'),(1477,'C0483','zh-cn','请选择影响区域！'),(1478,'C0483','en-us','Please select the area of ​​influence!'),(1479,'C0484','zh-cn','默认'),(1480,'C0484','en-us','default'),(1481,'E0041','zh-cn','模板名称在系统中已经存在，请重新输入！'),(1482,'E0041','en-us','Template name already exists in the system, please re-enter!'),(1483,'E0042','zh-cn','该配置地点正在被应用在配送服务模板中，不允许删除！'),(1484,'E0042','en-us','The configuration location is being applied in the distribution services template can not be deleted!'),(1485,'E0043','zh-cn','该配送服务正在被应用在配送服务模板中，不允许删除！'),(1486,'E0043','en-us','The distribution services are being applied in the distribution services template, not allowed to delete!'),(1487,'E0044','zh-cn','该配送服务正在被应用在商品的配送服务中，不允许删除！'),(1488,'E0044','en-us','The distribution services are being applied in the distribution of goods services, not allowed to delete!'),(1489,'M0046','zh-cn','财务管理'),(1490,'M0046','en-us','Financial Management'),(1491,'M0047','zh-cn','财务统计分析'),(1492,'M0047','en-us','Financial Analysis'),(1493,'M0048','zh-cn','财务科目'),(1494,'M0048','en-us','Cost Subject'),(1495,'M0049','zh-cn','财务收入支出'),(1496,'M0049','en-us','Financial income and expenses'),(1497,'M0050','zh-cn','资金账号'),(1498,'M0050','en-us','Capital account'),(1499,'M0051','zh-cn','内部资产'),(1500,'M0051','en-us','Internal assets'),(1501,'C0485','zh-cn','ECMS-资金账号'),(1502,'C0485','en-us','ECMS-Capital account'),(1503,'C0486','zh-cn','ECMS-运营成本'),(1504,'C0486','en-us','ECMS-Operating costs'),(1505,'C0487','zh-cn','在财务科目列表中不存在,请重新输入！'),(1506,'C0487','en-us','Cost subject list does not exist, please re-enter!'),(1507,'C0488','zh-cn','ECMS-财务收入支出'),(1508,'C0488','en-us','ECMS-Financial income and expenses'),(1509,'E0045','zh-cn','支付资金超出账号({0})的现有资金,请重新输入!'),(1510,'E0045','en-us','Available funds to pay the funds out of account ({0}), please re-enter!'),(1511,'E0046','zh-cn','支付资金超出账单总金额,请重新输入!'),(1512,'E0046','en-us','Disbursement of funds beyond the fees payable, please re-enter!'),(1513,'E0047','zh-cn','资金收入大于账单总金额'),(1514,'E0047','en-us','Funds to be receivable greater than accounts receivable...'),(1515,'C0489','zh-cn','ECMS-财务统计分析'),(1516,'C0489','en-us','ECMS-Finance Analysis'),(1517,'E0048','zh-cn','财务科目在系统中已经存在，请重新输入！'),(1518,'E0048','en-us','The cost account already exists in the system, please re-enter!'),(1519,'C0490','zh-cn','未付款'),(1520,'C0490','en-us','Pending payment'),(1521,'C0491','zh-cn','付款中'),(1522,'C0491','en-us','Payments'),(1523,'C0492','zh-cn','付款完成'),(1524,'C0492','en-us','Finish'),(1525,'C0493','zh-cn','已撤消'),(1526,'C0493','en-us','Cancel'),(1527,'C0494','zh-cn','编号'),(1528,'C0494','en-us','Code'),(1531,'C0496','zh-cn','站点'),(1532,'C0496','en-us','Sales region'),(1533,'C0497','zh-cn','财务科目'),(1534,'C0497','en-us','Cost subject'),(1535,'C0498','zh-cn','应付金额'),(1536,'C0498','en-us','Amount payable'),(1537,'C0499','zh-cn','实际支付金额'),(1538,'C0499','en-us','actual amount '),(1539,'C0500','zh-cn','执行情况'),(1540,'C0500','en-us','Implementation'),(1541,'C0501','zh-cn','操作人'),(1542,'C0501','en-us','Operator'),(1543,'C0502','zh-cn','币种'),(1544,'C0502','en-us','Currency'),(1545,'C0503','zh-cn','账单类别'),(1546,'C0503','en-us','Accounts Category'),(1547,'C0504','zh-cn','应收金额'),(1548,'C0504','en-us','Amounts receivable'),(1549,'C0505','zh-cn','实际收款金额'),(1550,'C0505','en-us','actual receivables'),(1551,'C0506','zh-cn','销售收入'),(1552,'C0506','en-us','Sales revenue'),(1553,'C0507','zh-cn','运营资金注入'),(1554,'C0507','en-us','Working capital injection'),(1555,'C0508','zh-cn','未收款'),(1556,'C0508','en-us','Pending receivables'),(1557,'C0509','zh-cn','收款中'),(1558,'C0509','en-us','Receivables'),(1559,'C0510','zh-cn','资金账号'),(1560,'C0510','en-us','FundAccount'),(1561,'C0511','zh-cn','发生动作'),(1562,'C0511','en-us','Action'),(1563,'C0512','zh-cn','发生币种'),(1564,'C0512','en-us','Currency'),(1565,'C0513','zh-cn','发生金额'),(1566,'C0513','en-us','Fund'),(1567,'C0514','zh-cn','发生损失'),(1568,'C0514','en-us','Losed'),(1569,'C0515','zh-cn','应收/应付账单'),(1570,'C0515','en-us','Receivable/payable accounts'),(1571,'C0516','zh-cn','结算币种'),(1572,'C0516','en-us','Billing currency'),(1573,'C0517','zh-cn','结算汇率'),(1574,'C0517','en-us','Closing rate'),(1575,'C0518','zh-cn','账单结算金额'),(1576,'C0518','en-us','settlement amount'),(1577,'C0519','zh-cn','财务收入'),(1578,'C0519','en-us','Accounts receivable'),(1579,'C0520','zh-cn','资金记录'),(1580,'C0520','en-us','Funds record'),(1581,'C0521','zh-cn','累计待付金额合计'),(1582,'C0521','en-us','Cumulative total amount to be paid'),(1583,'C0522','zh-cn','查询账单'),(1584,'C0522','en-us','Query Account'),(1585,'C0523','zh-cn','添加账单'),(1586,'C0523','en-us','Add Account'),(1587,'C0524','zh-cn','导出账单'),(1588,'C0524','en-us','Export Account'),(1589,'C0525','zh-cn','累计待收金额合计'),(1590,'C0525','en-us','total amount to be received'),(1591,'C0526','zh-cn','查询资金记录'),(1592,'C0526','en-us','Query funds record'),(1593,'C0527','zh-cn','导出资金记录'),(1594,'C0527','en-us','Export funding records'),(1595,'C0528','zh-cn','金额'),(1596,'C0528','en-us','Sum'),(1597,'C0529','zh-cn','支付资金'),(1598,'C0529','en-us','Disbursement of funds'),(1599,'C0530','zh-cn','添加'),(1600,'C0530','en-us','Add'),(1601,'C0531','zh-cn','支付货币'),(1602,'C0531','en-us','currency of payment'),(1603,'C0532','zh-cn','支付损失'),(1604,'C0532','en-us','Pay damages'),(1605,'C0533','zh-cn','资金收入'),(1606,'C0533','en-us','Income funds'),(1607,'C0534','zh-cn','收入货币'),(1608,'C0534','en-us','Paid-currency'),(1609,'C0535','zh-cn','实际金额'),(1610,'C0535','en-us','The actual amount'),(1611,'C0536','zh-cn','收款损失'),(1612,'C0536','en-us','Receivable losses'),(1613,'C0537','zh-cn','付款'),(1614,'C0537','en-us','Pay'),(1615,'C0538','zh-cn','撤消'),(1616,'C0538','en-us','Cancel'),(1617,'C0539','zh-cn','收款完成'),(1618,'C0539','en-us','Receivables completed'),(1619,'C0540','zh-cn','收款'),(1620,'C0540','en-us','Receive'),(1621,'C0541','zh-cn','支出'),(1622,'C0541','en-us','Expenses'),(1623,'C0542','zh-cn','收入'),(1624,'C0542','en-us','Income'),(1625,'C0543','zh-cn','财务支出'),(1626,'C0543','en-us','Accounts payable'),(1627,'C0544','zh-cn','财务科目不允许为空,请重新输入!'),(1628,'C0544','en-us','The cost subject is not allowed to be empty, please re-enter!'),(1629,'C0545','zh-cn','本次支付资金不允许为空,请重新输入!'),(1630,'C0545','en-us','Disbursement of funds is not allowed to be empty, please re-enter!'),(1631,'C0546','zh-cn','撤消支出账单'),(1632,'C0546','en-us','Undo accounts payable'),(1633,'C0547','zh-cn','该应付账单'),(1634,'C0547','en-us','The accounts payable'),(1635,'C0548','zh-cn','中,应付金额为'),(1636,'C0548','en-us',', The amount payable for the'),(1637,'C0549','zh-cn',' , 其中可撤消金额为'),(1638,'C0549','en-us','Which can undo amount'),(1639,'C0550','zh-cn','，是否撤消?'),(1640,'C0550','en-us','Whether undo?'),(1641,'C0551','zh-cn','资金账号不允许为空!'),(1642,'C0551','en-us','Capital account is not allowed to be empty!'),(1643,'C0552','zh-cn','支付资金必须小于或等于账目总金额!'),(1644,'C0552','en-us','Pay losses must be less than the actual disbursement of funds!'),(1645,'C0553','zh-cn','转换汇率必须大于0!'),(1646,'C0553','en-us','The conversion exchange rate must be greater than 0!'),(1647,'C0554','zh-cn','收入币种'),(1648,'C0554','en-us','Paid-currency'),(1649,'C0555','zh-cn','收入资金'),(1650,'C0555','en-us','The amount of paid-in'),(1651,'C0556','zh-cn','资金收入不允许为空,请重新输入!'),(1652,'C0556','en-us','Income funds do not allow for the empty, please re-enter!'),(1653,'C0557','zh-cn','收款损失必须小于账单总金额!'),(1654,'C0557','en-us','Receivable losses must be less than the actual amount!'),(1655,'C0558','zh-cn','撤消收入账单'),(1656,'C0558','en-us','Undo receivable accounts'),(1657,'C0559','zh-cn','该应收账单'),(1658,'C0559','en-us','The accounts receivable'),(1659,'C0560','zh-cn','中,应收金额为'),(1660,'C0560','en-us','In amounts receivable for'),(1661,'C0561','zh-cn',' , 其中可撤消金额为'),(1662,'C0561','en-us','Which can undo amount'),(1663,'C0562','zh-cn','查询'),(1664,'C0562','en-us','Query'),(1665,'C0563','zh-cn','财务科目在系统中已经存在，请重新输入！'),(1666,'C0563','en-us','The cost account already exists in the system, please re-enter!'),(1667,'C0564','zh-cn','资金情况'),(1668,'C0564','en-us','Funds'),(1669,'C0565','zh-cn','账内资金合计'),(1670,'C0565','en-us','Total account funds'),(1671,'C0566','zh-cn','资金列表'),(1672,'C0566','en-us','Funding list'),(1673,'C0567','zh-cn','所属银行'),(1674,'C0567','en-us','Bank'),(1675,'C0568','zh-cn','账号所有人'),(1676,'C0568','en-us','Owner'),(1677,'C0569','zh-cn','账内资金'),(1678,'C0569','en-us','Account funds'),(1679,'C0570','zh-cn','资金账号不能为空，请重新输入！'),(1680,'C0570','en-us','The capital account can not be empty, please re-enter!'),(1681,'C0571','zh-cn','所属银行不能为空，请重新输入！'),(1682,'C0571','en-us','Owned banks can not be empty, please re-enter!'),(1683,'C0572','zh-cn','账号所有人不能为空，请重新输入！'),(1684,'C0572','en-us','Account for all can not be empty, please re-enter!'),(1685,'C0573','zh-cn','上级财务科目'),(1686,'C0573','en-us','Cost subject at a higher level'),(1687,'C0574','zh-cn','请先选择需要修改的财务科目!'),(1688,'C0574','en-us','Please select the subjects need to modify the cost!'),(1689,'C0575','zh-cn','请先选择需要删除的财务科目!'),(1690,'C0575','en-us','Please select the subjects need to remove the cost!'),(1691,'C0576','zh-cn','请先选择需要移动的财务科目'),(1692,'C0576','en-us','Please select a cost subjects need to move'),(1693,'C0577','zh-cn','选择'),(1694,'C0577','en-us','Choose'),(1695,'C0578','zh-cn','运营情况统计'),(1696,'C0578','en-us','Operator statistics'),(1697,'C0579','zh-cn','现有资金情况'),(1698,'C0579','en-us','Availability of funding'),(1699,'C0580','zh-cn','账目收支平衡'),(1700,'C0580','en-us','Accounts of the balance of payments'),(1701,'C0581','zh-cn','类型'),(1702,'C0581','en-us','Type'),(1703,'C0582','zh-cn','总体盈亏'),(1704,'C0582','en-us','Overall gain or loss'),(1705,'C0583','zh-cn','当月盈亏'),(1706,'C0583','en-us','Month profit and loss'),(1707,'C0584','zh-cn','当月应收账单'),(1708,'C0584','en-us','Month accounts receivable'),(1709,'C0585','zh-cn','历史遗留账单'),(1710,'C0585','en-us','Historical legacy accounts'),(1711,'C0586','zh-cn','当月账单结算'),(1712,'C0586','en-us','Settlement of the month accounts'),(1713,'C0587','zh-cn','当月收款损失'),(1714,'C0587','en-us','Month receivables loss'),(1715,'C0588','zh-cn','当月实际收款资金'),(1716,'C0588','en-us','The month of the actual receivables funding'),(1717,'C0589','zh-cn','当月应付账单'),(1718,'C0589','en-us','Month accounts payable'),(1719,'C0590','zh-cn','历史遗留账单'),(1720,'C0590','en-us','Historical legacy accounts'),(1721,'C0591','zh-cn','当月账单结算'),(1722,'C0591','en-us','Settlement of the month accounts'),(1723,'C0592','zh-cn','当月支付损失'),(1724,'C0592','en-us','Month pay damages'),(1725,'C0593','zh-cn','当月实际支付资金'),(1726,'C0593','en-us','Month actual disbursement of funds'),(1727,'C0594','zh-cn','转出资金大于现有账号的资金量,操作异常!'),(1728,'C0594','en-us','Transfer funds greater than the amount of money for an existing account, abnormal operation!'),(1729,'C0595','zh-cn','转入资金必须大于0!'),(1730,'C0595','en-us','Transfer funds must be greater than 0!'),(1731,'C0596','zh-cn','内部转账'),(1732,'C0596','en-us','Internal transfer'),(1733,'C0597','zh-cn','转账记录'),(1734,'C0597','en-us','Transfer records'),(1735,'C0598','zh-cn','资金转账'),(1736,'C0598','en-us','Funds transfer'),(1737,'C0599','zh-cn','转出账号'),(1738,'C0599','en-us','Roll-out account'),(1739,'C0600','zh-cn','转出币种'),(1740,'C0600','en-us','Transferred out of currency'),(1741,'C0601','zh-cn','转出资金'),(1742,'C0601','en-us','Transfer funds'),(1743,'C0602','zh-cn','转入账号'),(1744,'C0602','en-us','Into account'),(1745,'C0603','zh-cn','转入币种'),(1746,'C0603','en-us','Transfer currency'),(1747,'C0604','zh-cn','转换汇率'),(1748,'C0604','en-us','Rate'),(1749,'C0605','zh-cn','转账损失'),(1750,'C0605','en-us','Transfer losses'),(1751,'C0606','zh-cn','转入资金'),(1752,'C0606','en-us','Transfer funds'),(1753,'C0607','zh-cn','导出转账记录'),(1754,'C0607','en-us','Export Transfer'),(1755,'C0608','zh-cn','属性值'),(1756,'C0608','en-us','Property Value'),(1757,'E0049','zh-cn','该属性编码在系统中已经存在，请重新输入！'),(1758,'E0049','en-us','The PropValue Code already exists in the system, please re-enter!'),(1759,'C0609','zh-cn','属性值编码'),(1760,'C0609','en-us','PropValue Code'),(1761,'C0610','zh-cn','属性-属性值'),(1762,'C0610','en-us','Prop-Value'),(1763,'C0611','zh-cn','设置'),(1764,'C0611','en-us','Set'),(1765,'C0612','zh-cn','分类编码'),(1766,'C0612','en-us','Code'),(1767,'C0613','zh-cn','商品分类编码'),(1768,'C0613','en-us','Pdc Code'),(1769,'C0614','zh-cn','与系统商品分类一致'),(1770,'C0614','en-us','Consistent with the system Categories'),(1771,'C0615','zh-cn','自定义导航'),(1772,'C0615','en-us','Custom navigation'),(1773,'C0616','zh-cn','网站商品导航'),(1774,'C0616','en-us','Website commodity navigation'),(1775,'C0617','zh-cn','该站点的'),(1776,'C0617','en-us','The sales area'),(1777,'C0618','zh-cn','的站点配送服务已经定义，如果清除这些国家，系统会将所有相关配送服务全部删除，是否继续执行？'),(1778,'C0618','en-us','The commodity distribution services have been defined, if these countries is clear, will delete all distribution services, whether or not to continue to perform?'),(1779,'E0050','zh-cn','该种类名称在系统中已经存在，请重新输入！'),(1780,'E0050','en-us','The category name already exists in the system, please re-enter!'),(1781,'C0619','zh-cn','切换语言环境'),(1782,'C0619','en-us','Switch Language'),(1783,'C0620','zh-cn','属性值不允许为空,请重新输入!'),(1784,'C0620','en-us','The property value is not allowed to be empty, please re-enter!'),(1785,'C0621','zh-cn','该属性值已经存在,请重新输入!'),(1786,'C0621','en-us','The property value already exists, please re-enter!'),(1787,'C0622','zh-cn','包含'),(1788,'C0622','en-us','Include'),(1789,'C0623','zh-cn','属性不能为空,请选择属性!'),(1790,'C0623','en-us','Attributes can not be empty Please select Properties!'),(1791,'C0624','zh-cn','该属性已经存在!'),(1792,'C0624','en-us','The property already exists!'),(1793,'C0625','zh-cn','分类编码'),(1794,'C0625','en-us','ProdCategoryCode'),(1795,'C0626','zh-cn','流水码'),(1796,'C0626','en-us','FlowCode'),(1797,'C0627','zh-cn','其他'),(1798,'C0627','en-us','Other'),(1799,'C0628','zh-cn','SKU属性及详细参数'),(1800,'C0628','en-us','The SKU attributes and detailed parameters'),(1801,'C0629','zh-cn','Sku编码长度'),(1802,'C0629','en-us','Sku encoding length'),(1803,'C0630','zh-cn','Sku编码规则'),(1804,'C0630','en-us','The Sku Coding Rules'),(1805,'C0631','zh-cn','属性'),(1806,'C0631','en-us','Property'),(1807,'C0632','zh-cn','系统中的属性已经全部被添加到该商品中,如需添加,请到商品属性界面中进行维护!'),(1808,'C0632','en-us','System attributes have all been added to the commodity To add, please go to product attributes interface for maintenance!'),(1809,'C0633','zh-cn','可销售数量'),(1810,'C0633','en-us','Salable quantity'),(1811,'C0634','zh-cn','库存量'),(1812,'C0634','en-us','Actual stock'),(1813,'C0635','zh-cn','该编码'),(1814,'C0635','en-us','This code'),(1815,'C0636','zh-cn','已经存在,请重新输入'),(1816,'C0636','en-us','Already exists, please re-enter'),(1817,'C0637','zh-cn','Sku属性的变化已经对Sku单元产生了影响,请仔细查看相关Sku单元数据!'),(1818,'C0637','en-us','Sku attribute the change of Sku unit generates impact, make sure you check the relevant the Sku unit data!'),(1819,'C0638','zh-cn','商品SKU编码存在重复,请重新输入!'),(1820,'C0638','en-us','The commodity the Sku coding existence repeat, please re-enter!'),(1821,'C0639','zh-cn','该属性已经被应用在商品中,不能被删除!'),(1822,'C0639','en-us','This attribute has been applied in the commodity can not be deleted!'),(1823,'C0640','zh-cn','该属性值已经被应用在商品中,不能被删除!'),(1824,'C0640','en-us','This attribute value has been applied in the commodity can not be deleted!'),(1825,'C0641','zh-cn','该网站商品导航已经在系统中存在,请重新输入!'),(1826,'C0641','en-us','Merchandise navigation of the site has been in the system exists, please re-enter!'),(1827,'M0052','zh-cn','图片&文件服务器空间'),(1828,'M0052','en-us','Picture Space'),(1829,'C0642','zh-cn','ECMS-图片&文件服务器空间'),(1830,'C0642','en-us','ECMS-Picture Space'),(1831,'C0643','zh-cn','搜索'),(1832,'C0643','en-us','Search'),(1833,'C0644','zh-cn','查看空间文件'),(1834,'C0644','en-us','View space file'),(1835,'C0645','zh-cn','当前目录搜索'),(1836,'C0645','en-us','Current directory search'),(1837,'C0646','zh-cn','当前目录及子目录搜索'),(1838,'C0646','en-us','Current directory and subdirectories search'),(1839,'C0647','zh-cn','全空间搜索'),(1840,'C0647','en-us','Full space search'),(1841,'C0648','zh-cn','查看图片'),(1842,'C0648','en-us','View Picture'),(1843,'C0649','zh-cn','加载更多数据'),(1844,'C0649','en-us','Load more'),(1845,'C0650','zh-cn','图片&文件丢失'),(1846,'C0650','en-us','Pictures & file missing'),(1847,'C0651','zh-cn','图片&文件服务器空间'),(1848,'C0651','en-us','Pictures & file server space'),(1849,'C0652','zh-cn','空间列表'),(1850,'C0652','en-us','Space List'),(1851,'C0653','zh-cn','添加服务器空间'),(1852,'C0653','en-us','Add Space'),(1853,'C0654','zh-cn','空间名称'),(1854,'C0654','en-us','SpaceName'),(1855,'C0655','zh-cn','Web地址'),(1856,'C0655','en-us','Web Address'),(1857,'C0656','zh-cn','Ftp地址'),(1858,'C0656','en-us','Ftp Address'),(1859,'C0657','zh-cn','空间根路径'),(1860,'C0657','en-us','Space Root'),(1861,'C0658','zh-cn','Ftp认证用户'),(1862,'C0658','en-us','Ftp User'),(1863,'C0659','zh-cn','内部文件夹数量'),(1864,'C0659','en-us','Directory Count'),(1865,'C0660','zh-cn','内部文件数量'),(1866,'C0660','en-us','File Count'),(1867,'C0661','zh-cn','刷新内部文件'),(1868,'C0661','en-us','Refresh Files'),(1869,'C0662','zh-cn','服务器空间'),(1870,'C0662','en-us','Server Space'),(1871,'C0663','zh-cn','不能为空,请输入!'),(1872,'C0663','en-us','is not null, please re-write!'),(1873,'C0664','zh-cn','选择并添加'),(1874,'C0664','en-us','Select'),(1875,'C0665','zh-cn','选择商品图片'),(1876,'C0665','en-us','Select a product picture'),(1877,'C0666','zh-cn','请重新选择商品图片'),(1878,'C0666','en-us','Please re-select merchandise picture'),(1879,'C0667','zh-cn','像素图'),(1880,'C0667','en-us','Pixmap'),(1881,'C0668','zh-cn','内部重量单位'),(1882,'C0668','en-us','Weight Unit'),(1883,'C0669','zh-cn','重量单位'),(1884,'C0669','en-us','Weight Unit'),(1885,'C0670','zh-cn','免运费'),(1886,'C0670','en-us','Free'),(1887,'C0671','zh-cn','重量计价单位'),(1888,'C0671','en-us','Weight Unit'),(1889,'C0672','zh-cn','查看'),(1890,'C0672','en-us','View'),(1891,'C0673','zh-cn','导入的账单文件只支持office excel2003, 请重新导入!'),(1892,'C0673','en-us','Import bill only support the office excel2003, re-import!'),(1893,'C0674','zh-cn','销售平台/区域'),(1894,'C0674','en-us','The Sales site / area'),(1895,'C0675','zh-cn','交易对方'),(1896,'C0675','en-us','Counterparty'),(1897,'C0676','zh-cn','业务内容'),(1898,'C0676','en-us','BizContent'),(1899,'C0677','zh-cn','处理结果'),(1900,'C0677','en-us','Result'),(1901,'C0678','zh-cn','交易号'),(1902,'C0678','en-us','Transaction number'),(1903,'C0679','zh-cn','交易创建时间'),(1904,'C0679','en-us','Creates Time'),(1905,'C0680','zh-cn','交易创建时间不是日期格式,请修改!'),(1906,'C0680','en-us','Transaction to create time not date format, modify!'),(1907,'C0681','zh-cn','该交易号已经在系统中存在'),(1908,'C0681','en-us','The transaction number which already exists in the system'),(1909,'C0682','zh-cn','交易中途关闭'),(1910,'C0682','en-us','Transaction midway Close'),(1911,'C0683','zh-cn','该财务科目不存在'),(1912,'C0683','en-us','The cost subject does not exist'),(1913,'C0684','zh-cn','商户订单号'),(1914,'C0684','en-us','Order Number'),(1915,'C0685','zh-cn','交易来源地'),(1916,'C0685','en-us','Transaction source'),(1917,'C0686','zh-cn','金额必须大于0'),(1918,'C0686','en-us','Amount must be greater than 0'),(1919,'C0687','zh-cn','该账号({0})的余额不足'),(1920,'C0687','en-us','The balance of the account ({0})'),(1921,'C0688','zh-cn','成功处理'),(1922,'C0688','en-us','Successfully imported'),(1923,'C0689','zh-cn','不做处理'),(1924,'C0689','en-us','Not treated'),(1925,'C0690','zh-cn','该文件不符合规范, 请根据文件(财务支出账单-支付宝)进行导入!'),(1926,'C0690','en-us','The file does not meet specifications, according to the documents (financial spending bill - Alipay) import!'),(1927,'C0691','zh-cn','该文件不符合规范, 请根据文件(付款信息)进行导入!'),(1928,'C0691','en-us','The file does not meet specifications, according to the file (payment information) import!'),(1929,'C0692','zh-cn','详情描述'),(1930,'C0692','en-us','order content'),(1931,'C0693','zh-cn','账单金额'),(1932,'C0693','en-us','Billings'),(1933,'C0694','zh-cn','已付金额'),(1934,'C0694','en-us','Amount Paid'),(1935,'C0695','zh-cn','该文件不符合规范, 请根据文件(财务支出账单-e邮宝)进行导入!'),(1936,'C0695','en-us','The file does not meet specifications, according to documents (financial spending bill - E-mail Bao) import!'),(1937,'C0696','zh-cn','快递费'),(1938,'C0696','en-us','Express Free'),(1939,'C0697','zh-cn','支付情况填写错误'),(1940,'C0697','en-us','Error'),(1941,'C0698','zh-cn','交易状态'),(1942,'C0698','en-us','State'),(1943,'C0699','zh-cn','金额（元）'),(1944,'C0699','en-us','Payment'),(1945,'C0700','zh-cn','支付情况'),(1946,'C0700','en-us','Pay state'),(1947,'C0701','zh-cn','支付者'),(1948,'C0701','en-us','Payer'),(1949,'C0702','zh-cn','未支付'),(1950,'C0702','en-us','UnPay'),(1951,'C0703','zh-cn','垫付者'),(1952,'C0703','en-us','Person'),(1953,'C0704','zh-cn','公司支付'),(1954,'C0704','en-us','Company'),(1955,'C0705','zh-cn','个人垫付'),(1956,'C0705','en-us','Person Pay'),(1957,'C0706','zh-cn','无支付信息'),(1958,'C0706','en-us','No payment information'),(1959,'C0707','zh-cn','该资金账号不存在'),(1960,'C0707','en-us','The capital account does not exist'),(1961,'C0708','zh-cn','该账号中资金不足'),(1962,'C0708','en-us','Insufficient funds in the account'),(1963,'C0709','zh-cn','编号不能为空'),(1964,'C0709','en-us','The number can not be empty'),(1965,'C0710','zh-cn','该编号在系统中不存在'),(1966,'C0710','en-us','The number in the system does not exist'),(1967,'C0711','zh-cn','该支付信息请在系统界面中进行操作'),(1968,'C0711','en-us','The payment information in the operating system interface'),(1969,'C0712','zh-cn','该账目已经支付完成'),(1970,'C0712','en-us','The accounts have been paid to complete'),(1971,'C0714','zh-cn','e邮宝'),(1972,'C0714','en-us','epost'),(1973,'C0713','zh-cn','不允许为空'),(1974,'C0713','en-us','is not empty'),(1975,'C0715','zh-cn','订单跟踪号在系统中存在'),(1976,'C0715','en-us','Order tracking numbers exist in the system'),(1977,'C0716','zh-cn','美国'),(1978,'C0716','en-us','American'),(1979,'C0717','zh-cn','英国'),(1980,'C0717','en-us','England'),(1981,'C0718','zh-cn','澳大利亚'),(1982,'C0718','en-us','Austrilian'),(1983,'C0721','zh-cn','该站点不存在'),(1984,'C0721','en-us','This sale area is not exits'),(1985,'C0719','zh-cn','客户'),(1986,'C0719','en-us','Customer'),(1987,'C0720','zh-cn','货物'),(1988,'C0720','en-us','Products'),(1989,'C0722','zh-cn','账单金额'),(1990,'C0722','en-us','Sum'),(1991,'C0723','zh-cn','收款账号'),(1992,'C0723','en-us','ReceiveAccount'),(1993,'C0724','zh-cn','日期'),(1994,'C0724','en-us','CreateTime'),(1995,'C0725','zh-cn','竞拍网站'),(1996,'C0725','en-us','Auction site'),(1997,'C0726','zh-cn','总额'),(1998,'C0726','en-us','Sum'),(1999,'C0727','zh-cn','币种'),(2000,'C0727','en-us','Currency'),(2001,'C0728','zh-cn','该币种在系统中不存在'),(2002,'C0728','en-us','The currency does not exist in the system'),(2003,'C0729','zh-cn','姓名'),(2004,'C0729','en-us','Name'),(2005,'C0730','zh-cn','交易号'),(2006,'C0730','en-us','Transaction'),(2007,'C0731','zh-cn','该交易号已经在系统中存在'),(2008,'C0731','en-us','The transaction number which already exists in the system'),(2009,'C0732','zh-cn','买家号'),(2010,'C0732','en-us','buyer'),(2011,'C0733','zh-cn','物品名称'),(2012,'C0733','en-us','product'),(2013,'C0734','zh-cn','商品'),(2014,'C0734','en-us','product'),(2015,'C0735','zh-cn','国家/地区'),(2016,'C0735','en-us','country/area'),(2017,'C0736','zh-cn','发件人电子邮件地址'),(2018,'C0736','en-us','senderemail'),(2019,'C0737','zh-cn','成交日期'),(2020,'C0737','en-us','TranscationDate'),(2021,'C0738','zh-cn','销售平台/区域在系统中不存在'),(2022,'C0738','en-us','Sale Site/Ares is not exists in system'),(2023,'C0739','zh-cn','费用'),(2024,'C0739','en-us','Amount'),(2025,'C0740','zh-cn','净额'),(2026,'C0740','en-us','Profit'),(2027,'C0741','zh-cn','该支付信息请在系统界面中进行操作'),(2028,'C0741','en-us','The receivables in the operating system interface'),(2029,'C0742','zh-cn','该账单已经收款完成'),(2030,'C0742','en-us','The bill receivables have been completed'),(2031,'C0743','zh-cn','导入e邮宝账单'),(2032,'C0743','en-us','Import e-mail Bao bill'),(2033,'C0744','zh-cn','导入支付宝账单'),(2034,'C0744','en-us','Import Alipay bills'),(2035,'C0745','zh-cn','导入账单'),(2036,'C0745','en-us','Import payment information'),(2037,'C0746','zh-cn','撤消当前账目'),(2038,'C0746','en-us','Undo the current accounts'),(2039,'C0747','zh-cn','批处理账单'),(2040,'C0747','en-us','Batch bill'),(2041,'C0748','zh-cn','导入Paypal账单'),(2042,'C0748','en-us','Import Paypal bill'),(2043,'C0749','zh-cn','账目总金额'),(2044,'C0749','en-us','Accounts for the total amount of'),(2045,'C0750','zh-cn','账单日期'),(2046,'C0750','en-us','The date of billing'),(2047,'C0751','zh-cn','账单号'),(2048,'C0751','en-us','Bill No.'),(2049,'C0752','zh-cn','导入文件'),(2050,'C0752','en-us','Import file'),(2051,'C0753','zh-cn','该文件只支持office excel 2003版本'),(2052,'C0753','en-us','The files only support office excel 2003 version'),(2053,'C0754','zh-cn','导入模板'),(2054,'C0754','en-us','Import Template'),(2055,'C0755','zh-cn','Excel模板文件下载'),(2056,'C0755','en-us','Excel template file download'),(2057,'C0756','zh-cn','其他相关信息'),(2058,'C0756','en-us','Other'),(2059,'C0757','zh-cn','待收'),(2060,'C0757','en-us','To be received'),(2061,'C0758','zh-cn','账目总金额必须大于0, 请重新输入!'),(2062,'C0758','en-us','Accounts for the total amount must be greater than 0, please re-enter!'),(2063,'C0759','zh-cn','是否终止该支出账单'),(2064,'C0759','en-us','Whether to revoke the spending bill'),(2065,'C0760','zh-cn','是否撤消当前支出账单'),(2066,'C0760','en-us','Whether to undo the current spending bill'),(2067,'C0761','zh-cn','查看支出账单'),(2068,'C0761','en-us','View spending bill'),(2069,'C0762','zh-cn','是否撤消当前收入账单'),(2070,'C0762','en-us','Whether to undo the current income bill'),(2071,'C0763','zh-cn','查看收入单据'),(2072,'C0763','en-us','View income documents'),(2073,'C0764','zh-cn','是否删除该收入账单'),(2074,'C0764','en-us','Whether to remove the income bill'),(2075,'C0765','zh-cn','该商品的Sku单元({0})不能被删除,它与站点商品存在映射关系,请先清理此关系!'),(2076,'C0765','en-us','The commodity the Sku unit ({0}) can not be deleted, and the mapping relationship exists with the goods station, please clean up this relationship!'),(2077,'C0766','zh-cn','该商品的Sku单元({0})不能被删除,它与站点商品存在赠品关系,请先清理此关系!'),(2078,'C0766','en-us','The commodities the Sku unit ({0}) can not be removed, with station merchandise giveaways relationship exists, please clean up this relationship!'),(2079,'C0767','zh-cn','重点运营国家'),(2080,'C0767','en-us','Key Operators countries'),(2081,'C0768','zh-cn','所有国家'),(2082,'C0768','en-us','All Country'),(2083,'C0769','zh-cn','重点运营'),(2084,'C0769','en-us','Key Operators'),(2085,'C0770','zh-cn','维护内部区域'),(2086,'C0770','en-us','Maintaining internal area'),(2087,'C0771','zh-cn','内部区域列表'),(2088,'C0771','en-us','Internal list of areas'),(2089,'C0772','zh-cn','区域'),(2090,'C0772','en-us','Area'),(2091,'C0773','zh-cn','不允许在国家下创建片区或国家'),(2092,'C0773','en-us','Area not allowed to be created at the national or national'),(2093,'C0774','zh-cn','在此国家的内部区域中不存在, 请重新输入'),(2094,'C0774','en-us','In the interior region of this country does not exist, please re-enter'),(2095,'C0775','zh-cn','请选择相应的国家节点'),(2096,'C0775','en-us','Please select the appropriate national nodes'),(2097,'C0776','zh-cn','维护内部区域'),(2098,'C0776','en-us','Maintaining internal area'),(2099,'C0777','zh-cn','可配送国家'),(2100,'C0777','en-us','Available Delivery Area'),(2101,'C0778','zh-cn','系统自动将上述覆盖国家纳入该可配送国家范围内'),(2102,'C0778','en-us','The system automatically the countries covered in the distribution in the national'),(2103,'M0053','zh-cn','物流方案'),(2104,'M0053','en-us','Logistics solutions'),(2105,'E0051','zh-cn','物流公司在系统中已经存在，请重新输入！'),(2106,'E0051','en-us','Logistics Company\'s name is repeat'),(2107,'E0052','zh-cn','物流方案在系统中已经存在，请重新输入！'),(2108,'E0052','en-us','Logistics solutions already exist in the system, please re-enter!'),(2109,'C0779','zh-cn','拼音分类'),(2110,'C0779','en-us','PinYin Type'),(2111,'C0780','zh-cn','片区'),(2112,'C0780','en-us','Region'),(2113,'C0781','zh-cn','基本信息'),(2114,'C0781','en-us','Basic Info'),(2115,'C0782','zh-cn','详细运费信息'),(2116,'C0782','en-us','Detailed shipping information'),(2117,'C0783','zh-cn','物流方案'),(2118,'C0783','en-us','Solutions'),(2119,'C0784','zh-cn','物流公司'),(2120,'C0784','en-us','Cooperation Company'),(2121,'C0785','zh-cn','快递类型'),(2122,'C0785','en-us','Courier type'),(2123,'C0786','zh-cn','计费模式'),(2124,'C0786','en-us','Billing model'),(2125,'C0787','zh-cn','首重'),(2126,'C0787','en-us','First re'),(2127,'C0788','zh-cn','续重'),(2128,'C0788','en-us','Continued amount'),(2129,'C0789','zh-cn','其他费用'),(2130,'C0789','en-us','Other expenses'),(2131,'C0790','zh-cn','体积重量换算'),(2132,'C0790','en-us','Volumetric Weight Conversion'),(2133,'C0791','zh-cn','长(cm)*宽(cm)*高(cm)'),(2134,'C0791','en-us','Length (cm) * width (cm) * (cm)'),(2135,'C0792','zh-cn','进度查询'),(2136,'C0792','en-us','Logistics status inquiry'),(2137,'C0793','zh-cn','偏远地区查询'),(2138,'C0793','en-us','Remote areas queries'),(2139,'C0794','zh-cn','VAT临界点'),(2140,'C0794','en-us','The VAT the critical point'),(2141,'C0795','zh-cn','征收额度'),(2142,'C0795','en-us','Levy amount'),(2143,'C0796','zh-cn','运费列表'),(2144,'C0796','en-us','Freight list'),(2145,'C0797','zh-cn','续重运费'),(2146,'C0797','en-us','Continued heavy freight'),(2147,'C0798','zh-cn','重量限制'),(2148,'C0798','en-us','Weight limit'),(2149,'C0799','zh-cn','参考时效'),(2150,'C0799','en-us','Reference aging'),(2151,'C0800','zh-cn','天'),(2152,'C0800','en-us','day'),(2153,'C0801','zh-cn','重量计费'),(2154,'C0801','en-us','Weight billing'),(2155,'C0802','zh-cn','重量体积计费'),(2156,'C0802','en-us','Weight volume billing'),(2157,'C0803','zh-cn','国际小包'),(2158,'C0803','en-us','International Packet'),(2159,'C0804','zh-cn','国际快递'),(2160,'C0804','en-us','International Express'),(2161,'C0805','zh-cn','国际大包'),(2162,'C0805','en-us','International package'),(2163,'C0806','zh-cn','测算重量'),(2164,'C0806','en-us','Estimated weight'),(2165,'C0807','zh-cn','运费'),(2166,'C0807','en-us','Freight'),(2167,'C0808','zh-cn','税费'),(2168,'C0808','en-us','Taxes'),(2169,'C0809','zh-cn','偏远附加费'),(2170,'C0809','en-us','Remote surcharge'),(2171,'C0810','zh-cn','进度跟踪'),(2172,'C0810','en-us','Progress tracking'),(2173,'C0811','zh-cn','支持'),(2174,'C0811','en-us','Support'),(2175,'C0812','zh-cn','资费测算'),(2176,'C0812','en-us','Tariff calculations'),(2177,'C0813','zh-cn','超重'),(2178,'C0813','en-us','Overweight'),(2179,'C0814','zh-cn','选择物流方案'),(2180,'C0814','en-us','Select logistics solutions'),(2181,'C0815','zh-cn','国内快递'),(2182,'C0815','en-us','Domestic express'),(2183,'C0816','zh-cn','物流公司'),(2184,'C0816','en-us','Logistics companies'),(2185,'C0817','zh-cn','官方网站'),(2186,'C0817','en-us','Official Website'),(2187,'C0818','zh-cn','资费'),(2188,'C0818','en-us','Tariff'),(2189,'C0819','zh-cn','已经存在,请重新添加'),(2190,'C0819','en-us','Already exists, please re-add'),(2191,'C0820','zh-cn','资费列表中有具体的区域,无法设置全球,请重新添加'),(2192,'C0820','en-us','Tariff list of specific areas, can not set the global, re-add'),(2193,'C0821','zh-cn','征税临界点'),(2194,'C0821','en-us','Taxation critical point'),(2195,'C0822','zh-cn','关税'),(2196,'C0822','en-us','State Tax'),(2197,'C0823','zh-cn','ECMS-物流方案'),(2198,'C0823','en-us','ECMS-logistics solutions'),(2199,'C0824','zh-cn','物流公司'),(2200,'C0824','en-us','Logistics Cooperation'),(2201,'C0825','zh-cn','出口海关关税'),(2202,'C0825','en-us','State tax information'),(2203,'C0826','zh-cn','续重'),(2204,'C0826','en-us','Continued heavy'),(2205,'C0827','zh-cn','VAT货币'),(2206,'C0827','en-us','VAT Currency'),(2207,'C0828','zh-cn','如果以下区域为空，则默认为全球'),(2208,'C0828','en-us','Following area is empty, the default global'),(2209,'C0829','zh-cn','包裹重量'),(2210,'C0829','en-us','Package weight'),(2211,'C0830','zh-cn','尺寸(cm)'),(2212,'C0830','en-us','Size (cm)'),(2213,'C0831','zh-cn','长'),(2214,'C0831','en-us','Length'),(2215,'C0832','zh-cn','宽'),(2216,'C0832','en-us','Width'),(2217,'C0833','zh-cn','高'),(2218,'C0833','en-us','Height'),(2219,'C0834','zh-cn','测算货币'),(2220,'C0834','en-us','Measuring Money'),(2221,'C0835','zh-cn','报关价值'),(2222,'C0835','en-us','Customs value'),(2223,'C0836','zh-cn','报关货币'),(2224,'C0836','en-us','Declaration Currency'),(2225,'C0837','zh-cn','如果以下为空，则默认为所有物流方案'),(2226,'C0837','en-us','If empty, the default for all solutions'),(2227,'C0838','zh-cn','运费小计'),(2228,'C0838','en-us','Total'),(2229,'C0839','zh-cn','运费'),(2230,'C0839','en-us','Shipping and handling charges'),(2231,'C0840','zh-cn','注意事项'),(2232,'C0840','en-us','Precautions'),(2233,'M0054','zh-cn','商品询价'),(2234,'M0054','en-us','Purchase Price'),(2235,'M0055','zh-cn','商品采购处理'),(2236,'M0055','en-us','Product Purchase'),(2237,'C0841','zh-cn','该商品在销售平台中发布或作为赠品，不能被删除!'),(2238,'C0841','en-us','The merchandise sales platform or as a gift to be associated, can not be deleted!'),(2239,'C0842','zh-cn','国际快递'),(2240,'C0842','en-us','International Express'),(2241,'C0843','zh-cn','本地快递'),(2242,'C0843','en-us','Local courier'),(2243,'C0844','zh-cn','运费模式'),(2244,'C0844','en-us','Type of Service'),(2245,'C0845','zh-cn','首件运费'),(2246,'C0845','en-us','First Charge'),(2247,'C0846','zh-cn','额外件运费'),(2248,'C0846','en-us','extra each piece freight'),(2249,'C0847','zh-cn','该文件不符合配送价格导入模板, 请重新导入!'),(2250,'C0847','en-us','The document does not meet the distribution price import template, please re-import!'),(2251,'C0848','zh-cn','目的地不存在'),(2252,'C0848','en-us','Destination does not exist'),(2253,'C0849','zh-cn','配送服务不存在'),(2254,'C0849','en-us','The delivery service does not exist'),(2255,'C0850','zh-cn','配送服务在该区域内不存在'),(2256,'C0850','en-us','Distribution services in the region does not exist'),(2257,'C0851','zh-cn','配送服务的服务类型不一致'),(2258,'C0851','en-us','Inconsistent service type of delivery service'),(2259,'C0852','zh-cn','参考交易号'),(2260,'C0852','en-us','Reference transaction number'),(2261,'C0853','zh-cn','发件人电子邮件地址'),(2262,'C0853','en-us','SendEmail'),(2263,'C0854','zh-cn','客户问题变更'),(2264,'C0854','en-us','Disputes undo'),(2265,'C0855','zh-cn','采购退款'),(2266,'C0855','en-us','Refund income'),(2267,'C0856','zh-cn','资金可用'),(2268,'C0856','en-us','availability of funds'),(2269,'C0857','zh-cn','资金暂不可用,银行冻结'),(2270,'C0857','en-us','Temporarily available funds, and banks to freeze'),(2271,'C0858','zh-cn','刷新'),(2272,'C0858','en-us','Refresh'),(2273,'C0859','zh-cn','导入速卖通账单'),(2274,'C0859','en-us','Import bill AliExpress'),(2275,'C0860','zh-cn','付款日期'),(2276,'C0860','en-us','Payment date'),(2277,'C0861','zh-cn','到账日期'),(2278,'C0861','en-us','Daozhang Date'),(2279,'C0862','zh-cn','资金状态'),(2280,'C0862','en-us','Funds Status'),(2281,'C0863','zh-cn','年'),(2282,'C0863','en-us','Year'),(2283,'C0864','zh-cn','月'),(2284,'C0864','en-us','Month'),(2285,'C0865','zh-cn','截止到'),(2286,'C0865','en-us','Until'),(2287,'C0866','zh-cn','截止'),(2288,'C0866','en-us','Until'),(2289,'C0867','zh-cn','现在'),(2290,'C0867','en-us','Now'),(2291,'C0868','zh-cn','待付'),(2292,'C0868','en-us','To be paid'),(2293,'C0869','zh-cn','冻结'),(2294,'C0869','en-us','Freeze'),(2295,'C0870','zh-cn','未收'),(2296,'C0870','en-us','Uncollected'),(2297,'C0871','zh-cn','资金解冻'),(2298,'C0871','en-us','Funds unfrozen'),(2299,'C0872','zh-cn','冻结中'),(2300,'C0872','en-us','Freeze in'),(2301,'C0873','zh-cn','资金到账'),(2302,'C0873','en-us','Funds credited into'),(2303,'C0874','zh-cn','站点不能为空,请重新输入!'),(2304,'C0874','en-us','The sales market can not be empty, please re-enter!'),(2305,'C0875','zh-cn','导入文件直接从支付宝官方网站下载'),(2306,'C0875','en-us','Import files directly from the official website of Alipay download'),(2307,'C0876','zh-cn','请以系统的导出文件为准'),(2308,'C0876','en-us','Please refer to the system of export bills'),(2309,'C0877','zh-cn','导入文件直接从e邮宝官方网站下载'),(2310,'C0877','en-us','Import files directly downloaded from the official website of the e-mail Bao'),(2311,'C0878','zh-cn','导入文件直接从Paypal官方网站下载'),(2312,'C0878','en-us','Import files directly from Paypal official website Download'),(2313,'C0879','zh-cn','导入文件直接从AirExpress官方网站下载'),(2314,'C0879','en-us','Import files directly from the Download the AirExpress official website'),(2315,'C0880','zh-cn','账单'),(2316,'C0880','en-us','Bill'),(2317,'C0881','zh-cn','转出日期'),(2318,'C0881','en-us','Roll-out date'),(2319,'C0882','zh-cn','转入日期'),(2320,'C0882','en-us','Transfer Date'),(2321,'C0883','zh-cn','到账'),(2322,'C0883','en-us','Daozhang'),(2323,'C0884','zh-cn','确认'),(2324,'C0884','en-us','Confirm'),(2325,'C0885','zh-cn','账单来源'),(2326,'C0885','en-us','Billing source'),(2327,'C0886','zh-cn','原始识别码'),(2328,'C0886','en-us','Original ID'),(2329,'C0887','zh-cn','资金流水号'),(2330,'C0887','en-us','Funds serial number'),(2331,'C0888','zh-cn','实际到账资金大于账单总金额'),(2332,'C0888','en-us','The actual Daozhang funds is greater than the total amount of the bill'),(2333,'C0889','zh-cn','支出资金大于账单总金额'),(2334,'C0889','en-us','Expenditure of funds is greater than the total amount of the bill'),(2335,'C0890','zh-cn','刷新实时汇率'),(2336,'C0890','en-us','Refresh Rate'),(2337,'C0891','zh-cn','资金转入'),(2338,'C0891','en-us','FundIn'),(2339,'C0892','zh-cn','商品成本'),(2340,'C0892','en-us','PurchaseCose'),(2341,'C0893','zh-cn','采购订单号'),(2342,'C0893','en-us','PurchaseOrder'),(2343,'C0894','zh-cn','收入'),(2344,'C0894','en-us','Receive'),(2345,'C0895','zh-cn','付款时间'),(2346,'C0895','en-us','PayTime'),(2347,'C0896','zh-cn','收/支'),(2348,'C0896','en-us','Receive/Pay'),(2349,'C0897','zh-cn','成功退款（元）'),(2350,'C0897','en-us','Refund'),(2351,'C0898','zh-cn','最近修改时间'),(2352,'C0898','en-us','LastUpdatedTime'),(2353,'C0899','zh-cn','退款'),(2354,'C0899','en-us','Refund'),(2355,'C0900','zh-cn','直接退款'),(2356,'C0900','en-us','DirectRefund'),(2357,'C0901','zh-cn','PayPal卡确认退款'),(2358,'C0901','en-us','PayPal card confirmation refund'),(2359,'C0902','zh-cn','已完成'),(2360,'C0902','en-us','Finished'),(2361,'C0903','zh-cn','临时冻结'),(2362,'C0903','en-us','Temporary freeze'),(2363,'C0904','zh-cn','纠纷退款'),(2364,'C0904','en-us','Disputes refund'),(2365,'C0905','zh-cn','更新为撤销'),(2366,'C0905','en-us','Updated to revoke'),(2367,'C0906','zh-cn','已取消'),(2368,'C0906','en-us','Canceled'),(2369,'C0907','zh-cn','eBay买家争议'),(2370,'C0907','en-us','eBay buyers Dispute'),(2371,'C0908','zh-cn','撤销'),(2372,'C0908','en-us','Revocation'),(2373,'C0909','zh-cn','已撤销'),(2374,'C0909','en-us','Revocationed'),(2375,'C0910','zh-cn','已付款'),(2376,'C0910','en-us','Paid'),(2377,'C0911','zh-cn','已发送快速结账付款'),(2378,'C0911','en-us','Sent Express Checkout payment'),(2379,'C0912','zh-cn','已发送预核准付款'),(2380,'C0912','en-us','Sent pre-approved payment'),(2381,'C0913','zh-cn','已取消付款'),(2382,'C0913','en-us','Payment has been canceled'),(2383,'C0914','zh-cn','已收到付款'),(2384,'C0914','en-us','Payment Received'),(2385,'C0915','zh-cn','手机付款已收到'),(2386,'C0915','en-us','Phone payment has been received'),(2387,'C0916','zh-cn','转账'),(2388,'C0916','en-us','Transfer'),(2389,'C0917','zh-cn','已结清'),(2390,'C0917','en-us','Has been settled'),(2391,'C0918','zh-cn','付款'),(2392,'C0918','en-us','Pay'),(2393,'C0919','zh-cn','待处理'),(2394,'C0919','en-us','Pending'),(2395,'C0920','zh-cn','资金可用性'),(2396,'C0920','en-us','Availability of funds'),(2397,'C0921','zh-cn','资金现已可用'),(2398,'C0921','en-us','Funds are now available'),(2399,'C0922','zh-cn','资金暂不可用'),(2400,'C0922','en-us','Funding is not yet available'),(2401,'C0923','zh-cn','更新为已收到电子支票'),(2402,'C0923','en-us','Update has been received electronic check'),(2403,'C0924','zh-cn','订单号'),(2404,'C0924','en-us','OrderNum'),(2405,'C0925','zh-cn','买家名称'),(2406,'C0925','en-us','Buyer'),(2407,'C0926','zh-cn','产品信息'),(2408,'C0926','en-us','ProductInfo'),(2409,'C0927','zh-cn','订单金额'),(2410,'C0927','en-us','Order amount'),(2411,'C0928','zh-cn','下单时间'),(2412,'C0928','en-us','Order time'),(2413,'C0929','zh-cn','付款时间'),(2414,'C0929','en-us','PayTime'),(2415,'C0930','zh-cn','发货时间'),(2416,'C0930','en-us','ShipTime'),(2417,'C0931','zh-cn','确认收货时间'),(2418,'C0931','en-us','Confirm the time of receipt'),(2419,'C0932','zh-cn','手续费'),(2420,'C0932','en-us','Fee'),(2421,'C0933','zh-cn','联盟佣金'),(2422,'C0933','en-us','Union commission'),(2423,'C0934','zh-cn','已放款金额'),(2424,'C0934','en-us','Has loan amount'),(2425,'C0935','zh-cn','放款时间'),(2426,'C0935','en-us','Lenders time'),(2427,'C0936','zh-cn','产品名'),(2428,'C0936','en-us','ProductName'),(2429,'C0937','zh-cn','推广费'),(2430,'C0937','en-us','Promotion expenses'),(2431,'C0938','zh-cn','客户订单号'),(2432,'C0938','en-us','Sales Order Number'),(2433,'C0939','zh-cn','月度报表'),(2434,'C0939','en-us','Monthly statements'),(2435,'C0940','zh-cn','季度报表'),(2436,'C0940','en-us','Quarterly reports'),(2437,'C0941','zh-cn','年度报表'),(2438,'C0941','en-us','Annual Report on'),(2439,'C0942','zh-cn','第一季度'),(2440,'C0942','en-us','The first quarter'),(2441,'C0943','zh-cn','第二季度'),(2442,'C0943','en-us','Second quarter'),(2443,'C0944','zh-cn','第三季度'),(2444,'C0944','en-us','Third quarter'),(2445,'C0945','zh-cn','第四季度'),(2446,'C0945','en-us','Fourth quarter'),(2447,'C0946','zh-cn','季度'),(2448,'C0946','en-us','quarter'),(2449,'C0947','zh-cn','总体收支平衡'),(2450,'C0947','en-us','Overall balance'),(2451,'C0948','zh-cn','收支平衡'),(2452,'C0948','en-us','balance'),(2453,'C0949','zh-cn','资金平衡'),(2454,'C0949','en-us','fund balance'),(2455,'C0950','zh-cn','待付/转出资金'),(2456,'C0950','en-us','Transfer funds'),(2457,'C0951','zh-cn','上'),(2458,'C0951','en-us','Last'),(2459,'C0952','zh-cn','待收/转入资金'),(2460,'C0952','en-us','Pending closing / transfer funds'),(2461,'C0953','zh-cn','应付账目'),(2462,'C0953','en-us','Accounts payable'),(2463,'C0954','zh-cn','应收账目'),(2464,'C0954','en-us','Accounts receivable'),(2465,'C0955','zh-cn','应付账目结算'),(2466,'C0955','en-us','Accounts payable settlement'),(2467,'C0956','zh-cn','应收账目结算'),(2468,'C0956','en-us','Settlement of accounts receivable'),(2469,'C0957','zh-cn','流出资金'),(2470,'C0957','en-us','Outflow of funds'),(2471,'C0958','zh-cn','流入资金'),(2472,'C0958','en-us','Capital inflows'),(2473,'C0959','zh-cn','收入/支出/转账损失'),(2474,'C0959','en-us','Income / expense / transfer losses'),(2475,'C0960','zh-cn','下'),(2476,'C0960','en-us','Next'),(2477,'C0961','zh-cn','类目'),(2478,'C0961','en-us','Item'),(2479,'C0962','zh-cn','折合人民币'),(2480,'C0962','en-us','RMB'),(2481,'C0963','zh-cn','待付账目结算'),(2482,'C0963','en-us','Pending payment of accounts settlement'),(2483,'C0964','zh-cn','待收账目结算'),(2484,'C0964','en-us','After closing accounts'),(2485,'C0965','zh-cn','资金转出'),(2486,'C0965','en-us','Roll-out of funds'),(2487,'C0966','zh-cn','未定义'),(2488,'C0966','en-us','None'),(2489,'C0967','zh-cn','收入损失'),(2490,'C0967','en-us','Loss of income'),(2491,'C0968','zh-cn','支出损失'),(2492,'C0968','en-us','Expenditures loss'),(2493,'C0969','zh-cn','转账损失'),(2494,'C0969','en-us','Transfer losses'),(2495,'C0970','zh-cn','资金转入'),(2496,'C0970','en-us','Transfer funds to'),(2497,'C0971','zh-cn','合计'),(2498,'C0971','en-us','Sum'),(2499,'C0972','zh-cn','资金'),(2500,'C0972','en-us','Fund'),(2501,'C0973','zh-cn','资金支出'),(2502,'C0973','en-us','Capital expenditure'),(2503,'C0974','zh-cn','资金收入'),(2504,'C0974','en-us','Capital income'),(2505,'C0975','zh-cn','缺失汇率'),(2506,'C0975','en-us','Lack of exchange rate'),(2507,'C0976','zh-cn','财务总体情况'),(2508,'C0976','en-us','Financial general situation'),(2509,'C0977','zh-cn','财务账目明细'),(2510,'C0977','en-us','Financial accounts details'),(2511,'C0978','zh-cn','财务账目结算明细'),(2512,'C0978','en-us','Financial accounts billing details'),(2513,'C0979','zh-cn','资金进出明细'),(2514,'C0979','en-us','Movement of capital in and out of Details'),(2515,'C0980','zh-cn','待结金额'),(2516,'C0980','en-us','Pending Amount'),(2517,'C0981','zh-cn','下载报表'),(2518,'C0981','en-us','Download Report'),(2519,'C0982','zh-cn','财务报表'),(2520,'C0982','en-us','Report'),(2521,'C0983','zh-cn','工作日'),(2522,'C0983','en-us','working day'),(2523,'C0984','zh-cn','个工作日'),(2524,'C0984','en-us','working day'),(2525,'C0985','zh-cn','重量区间'),(2526,'C0985','en-us','Weight range'),(2527,'C0986','zh-cn','导入'),(2528,'C0986','en-us','Import'),(2529,'C0987','zh-cn','导出'),(2530,'C0987','en-us','Export'),(2531,'C0988','zh-cn','VAT税率'),(2532,'C0988','en-us','VAT rate'),(2533,'C0989','zh-cn','VAT起征点'),(2534,'C0989','en-us','VAT threshold'),(2535,'C0990','zh-cn','相关重量数据设置异常'),(2536,'C0990','en-us','The related weight data sets the exception'),(2537,'C0991','zh-cn','存在重复记录'),(2538,'C0991','en-us','is repeat'),(2539,'C0992','zh-cn','在系统中不存在'),(2540,'C0992','en-us','Does not exist in the system'),(2541,'C0993','zh-cn','存在关税'),(2542,'C0993','en-us','Existence of tariffs'),(2543,'C0994','zh-cn','该物流公司内存在物流方案,不允许被删除'),(2544,'C0994','en-us','The logistics cooperation memory logistics solutions, is not allowed to be deleted'),(2545,'C0995','zh-cn','关税'),(2546,'C0995','en-us','Rate'),(2547,'C0996','zh-cn','请先进行资费测算'),(2548,'C0996','en-us','Please tariff calculation'),(2549,'C0997','zh-cn','该物流方案中已经存在全球,不允许设置其他国家'),(2550,'C0997','en-us','The solution already exists in the world, set up in other countries are not allowed'),(2551,'C0998','zh-cn','配送成本测算'),(2552,'C0998','en-us','Distribution costs budget'),(2553,'C0999','zh-cn','包裹重量或体积必须大于0'),(2554,'C0999','en-us','The weight of the package or parcel volume must be greater than 0'),(2555,'C1000','zh-cn','该区域或下级区域被应用于物流方案中，不允许删除！'),(2556,'C1000','en-us','In the region or lower-level areas are used in logistics solutions can not be deleted!'),(2557,'C1001','zh-cn','该区域或下级区域被应用于配送服务中，不允许删除！'),(2558,'C1001','en-us','The region or lower-level areas are used in distribution services can not be deleted!'),(2559,'C1002','zh-cn','运费检测'),(2560,'C1002','en-us','Shipping detection'),(2561,'C1003','zh-cn','该文件只支持zip格式的压缩文件'),(2562,'C1003','en-us','The file only supports zip compressed file format'),(2563,'C1004','zh-cn','下调'),(2564,'C1004','en-us','Down'),(2565,'C1005','zh-cn','上调'),(2566,'C1005','en-us','Up'),(2567,'C1006','zh-cn','在核对文件中不存在,需要重新核查'),(2568,'C1006','en-us','Check the file does not exist, the need to re-verification'),(2569,'C1007','zh-cn','待添加的运费数据'),(2570,'C1007','en-us','Freight data to be added'),(2571,'C1008','zh-cn','物流方案缺失'),(2572,'C1008','en-us','System of logistics solutions missing'),(2573,'C1009','zh-cn','ECMS-采购价格'),(2574,'C1009','en-us','ECMS-Purchase Price'),(2575,'C1010','zh-cn','供应商在系统中已经存在,请重新输入'),(2576,'C1010','en-us','The suppliers already exists in the system, please re-enter'),(2577,'C1011','zh-cn','站点'),(2578,'C1011','en-us','Sale Region'),(2579,'C1012','zh-cn','联系人在系统中已经存在,请重新输入'),(2580,'C1012','en-us','Contact already exists in the system, please re-enter'),(2581,'C1013','zh-cn','系统识别码'),(2582,'C1013','en-us','SysKey'),(2583,'C1014','zh-cn','按重量计费'),(2584,'C1014','en-us','Billing by weight'),(2585,'C1015','zh-cn','按件计费'),(2586,'C1015','en-us','Pay Per Incident'),(2587,'C1016','zh-cn','固定运费'),(2588,'C1016','en-us','Fixed shipping'),(2589,'C1017','zh-cn','每单运费'),(2590,'C1017','en-us','single shipping'),(2591,'C1018','zh-cn','有效'),(2592,'C1018','en-us','Available'),(2593,'C1019','zh-cn','无效'),(2594,'C1019','en-us','Unable'),(2595,'C1020','zh-cn','首件报价'),(2596,'C1020','en-us','First piece quote'),(2597,'C1021','zh-cn','额外件报价'),(2598,'C1021','en-us','Each additional quote'),(2599,'C1022','zh-cn','SKU单元被应用在赠品中，无法被限制'),(2600,'C1022','en-us','SKU unit is used in a gift, you can not be restricted'),(2601,'C1023','zh-cn','SKU单元被应用在销售单元，无法被限制'),(2602,'C1023','en-us','SKU unit is applied in the sales unit and can not be limited'),(2603,'C1024','zh-cn','SKU单元不允许全部被限售'),(2604,'C1024','en-us','SKU unit does not allow all been restricted'),(2605,'C1025','zh-cn','停售'),(2606,'C1025','en-us','Stop'),(2607,'C1026','zh-cn','商品销售编码在系统中已经存在，请重新输入'),(2608,'C1026','en-us','Merchandising encoded in the system already exists, please re-enter'),(2609,'C1027','zh-cn','最小时效'),(2610,'C1027','en-us','Minimum aging'),(2611,'C1028','zh-cn','最大时效'),(2612,'C1028','en-us','Maximum aging'),(2613,'C1029','zh-cn','重复定义'),(2614,'C1029','en-us','Redefinition'),(2615,'C1030','zh-cn','站点商品信息'),(2616,'C1030','en-us','Station Product information'),(2617,'C1031','zh-cn','体积'),(2618,'C1031','en-us','Parcel volume'),(2619,'C1032','zh-cn','选择空间图片'),(2620,'C1032','en-us','Select Space Pictures'),(2621,'C1033','zh-cn','站点商品'),(2622,'C1033','en-us','Station Product'),(2623,'C1034','zh-cn','查询条件'),(2624,'C1034','en-us','Query'),(2625,'C1035','zh-cn','高级'),(2626,'C1035','en-us','Advance'),(2627,'C1036','zh-cn','排序条件'),(2628,'C1036','en-us','Sort by'),(2629,'C1037','zh-cn','查询属性'),(2630,'C1037','en-us','Query Prop'),(2631,'C1038','zh-cn','排序列表'),(2632,'C1038','en-us','Sort the list'),(2633,'C1039','zh-cn','排序字段'),(2634,'C1039','en-us','Sort Field'),(2635,'C1040','zh-cn','排序顺序'),(2636,'C1040','en-us','Sort Order'),(2637,'C1041','zh-cn','图片压缩'),(2638,'C1041','en-us','Image processing'),(2639,'C1042','zh-cn','SKU相关属性值'),(2640,'C1042','en-us','SKU associated attribute values'),(2641,'C1043','zh-cn','内部映射关系'),(2642,'C1043','en-us','Internal mappings'),(2643,'C1044','zh-cn','商品销售定价'),(2644,'C1044','en-us','Merchandising Pricing'),(2645,'C1045','zh-cn','商品利润分析'),(2646,'C1045','en-us','Product profitability analysis'),(2647,'C1046','zh-cn','商品导航'),(2648,'C1046','en-us','Product Navigation'),(2649,'C1047','zh-cn','商品销售编码'),(2650,'C1047','en-us','Merchandising coding'),(2651,'C1048','zh-cn','单位'),(2652,'C1048','en-us','Unit'),(2653,'C1049','zh-cn','销售定价'),(2654,'C1049','en-us','Sales Pricing'),(2655,'C1050','zh-cn','统一设置'),(2656,'C1050','en-us','Unified set of'),(2657,'C1051','zh-cn','报价'),(2658,'C1051','en-us','Quoted price'),(2659,'C1052','zh-cn','商品利润'),(2660,'C1052','en-us','Commodity profits'),(2661,'C1053','zh-cn','站点商品'),(2662,'C1053','en-us','Sales of goods station'),(2663,'C1054','zh-cn','内部关联商品'),(2664,'C1054','en-us','Related product inside'),(2665,'C1055','zh-cn','内部商品'),(2666,'C1055','en-us','Related product'),(2667,'C1056','zh-cn','交易成本'),(2668,'C1056','en-us','Transaction costs'),(2669,'C1057','zh-cn','包装成本'),(2670,'C1057','en-us','Packaging costs'),(2671,'C1058','zh-cn','折扣率'),(2672,'C1058','en-us','Discount'),(2673,'C1059','zh-cn','实际售价'),(2674,'C1059','en-us','Actual price'),(2675,'C1060','zh-cn','赠品选项'),(2676,'C1060','en-us','Optional gift list'),(2677,'C1061','zh-cn','赠品'),(2678,'C1061','en-us','Premiums'),(2679,'C1062','zh-cn','赠品描述'),(2680,'C1062','en-us','Gift Description'),(2681,'C1063','zh-cn','类别'),(2682,'C1063','en-us','Category'),(2683,'C1064','zh-cn','商品成本'),(2684,'C1064','en-us','Procurement costs'),(2685,'C1065','zh-cn','款式'),(2686,'C1065','en-us','Style'),(2687,'C1066','zh-cn','种'),(2688,'C1066','en-us','Seed'),(2689,'C1067','zh-cn','供应商缺失'),(2690,'C1067','en-us','Missing supplier'),(2691,'C1068','zh-cn','限制销售'),(2692,'C1068','en-us','Restricted distribution'),(2693,'C1069','zh-cn','供应商'),(2694,'C1069','en-us','Supplier'),(2695,'C1070','zh-cn','开放'),(2696,'C1070','en-us','Open'),(2697,'C1071','zh-cn','限制'),(2698,'C1071','en-us','Limit'),(2699,'C1072','zh-cn','家'),(2700,'C1072','en-us','Unit'),(2701,'C1073','zh-cn','无限制'),(2702,'C1073','en-us','Unlimited'),(2703,'C1074','zh-cn','商品名称的长度必须小于80个字符'),(2704,'C1074','en-us','Brand name length must be less than 80 characters'),(2705,'C1075','zh-cn','库存单位的长度必须小于10个字符'),(2706,'C1075','en-us','Inventory units must be less than 10 characters in length'),(2707,'C1076','zh-cn','包裹重量必须大于0'),(2708,'C1076','en-us','Express the weight must be greater than 0'),(2709,'C1077','zh-cn','添加排序'),(2710,'C1077','en-us','Add sorting'),(2711,'C1078','zh-cn','正序'),(2712,'C1078','en-us','Asc'),(2713,'C1079','zh-cn','倒序'),(2714,'C1079','en-us','Desc'),(2715,'C1080','zh-cn','保持原样'),(2716,'C1080','en-us','Intact'),(2717,'C1081','zh-cn','自动压缩'),(2718,'C1081','en-us','Automatic compression'),(2719,'C1082','zh-cn','和'),(2720,'C1082','en-us','And'),(2721,'C1083','zh-cn','图片不能为空,请重新选择'),(2722,'C1083','en-us','Pictures can not be empty, please re-select'),(2723,'C1084','zh-cn','销售区域及导航'),(2724,'C1084','en-us','Sales area and navigation'),(2725,'C1085','zh-cn','销售利润'),(2726,'C1085','en-us','Profit'),(2727,'C1086','zh-cn','促销活动'),(2728,'C1086','en-us','Promotions'),(2729,'C1087','zh-cn','设置销售商品'),(2730,'C1087','en-us','Set of sale merchandise'),(2731,'C1088','zh-cn','商品导航不能为空，请重新输入！'),(2732,'C1088','en-us','Goods navigation can not be empty, please re-enter!'),(2733,'C1089','zh-cn','内部映射关系必须与当前商品建立对应关系，请重新输入！'),(2734,'C1089','en-us','Internal mapping relationship must be established with the current commodity correspondence, please re-enter!'),(2735,'C1090','zh-cn','SKU编码'),(2736,'C1090','en-us','SKU Code'),(2737,'C1091','zh-cn','销量限制'),(2738,'C1091','en-us','Sale Limit'),(2739,'C1092','zh-cn','关联商品'),(2740,'C1092','en-us','Set commodity-related'),(2741,'C1093','zh-cn','设置内部商品映射关系'),(2742,'C1093','en-us','Set the internal mapping between goods'),(2743,'C1094','zh-cn','关联数量'),(2744,'C1094','en-us','Rel Qty'),(2745,'C1095','zh-cn','关联的内部商品'),(2746,'C1095','en-us','Associated with the internal commodity'),(2747,'C1096','zh-cn','商品定价'),(2748,'C1096','en-us','Commodity pricing'),(2749,'C1097','zh-cn','实际售价必须小于或等于标准售价'),(2750,'C1097','en-us','Actual selling price must be less than or equal to the standard price'),(2751,'C1098','zh-cn','数量'),(2752,'C1098','en-us','Qty'),(2753,'C1099','zh-cn','赠品描述不能为空，请重新输入！'),(2754,'C1099','en-us','Gift Description can not be empty, please re-enter!'),(2755,'C1100','zh-cn','内部商品信息不能为空，请添加！'),(2756,'C1100','en-us','Internal Product information can not be empty, please add!'),(2757,'C1101','zh-cn','配送价格'),(2758,'C1101','en-us','Delivery Price'),(2759,'C1102','zh-cn','首件利润'),(2760,'C1102','en-us','First pieces of profits'),(2761,'C1103','zh-cn','第二件利润'),(2762,'C1103','en-us','The second profit'),(2763,'C1104','zh-cn','第三件利润'),(2764,'C1104','en-us','The third profit'),(2765,'C1105','zh-cn','第四件利润'),(2766,'C1105','en-us','The fourth profit'),(2767,'C1106','zh-cn','第五件利润'),(2768,'C1106','en-us','Fifth instrument profit'),(2769,'C1107','zh-cn','商品库存'),(2770,'C1107','en-us','Stock'),(2771,'C1108','zh-cn','商品销售信息'),(2772,'C1108','en-us','Merchandise sales information'),(2773,'C1109','zh-cn','已选中数据'),(2774,'C1109','en-us','Selected'),(2775,'C1110','zh-cn','无选中的商品'),(2776,'C1110','en-us','No items selected'),(2777,'C1111','zh-cn','商品SKU单元'),(2778,'C1111','en-us','Product SKU'),(2779,'C1112','zh-cn','系统中所有属性都在属性列表中,无属性可添加!'),(2780,'C1112','en-us','System, all attributes in the Properties list, no attributes can be added!'),(2781,'C1113','zh-cn','SKU单元不允许为空'),(2782,'C1113','en-us','SKU unit does not allow empty'),(2783,'C1114','zh-cn','请先选择左边区域的商品导航！'),(2784,'C1114','en-us','Please select the regions merchandise left navigation!'),(2785,'C1115','zh-cn','商品搜索属性'),(2786,'C1115','en-us','Product Search Properties'),(2787,'C1116','zh-cn','维护商品导航'),(2788,'C1116','en-us','Maintenance Goods Navigation'),(2789,'C1117','zh-cn','导航'),(2790,'C1117','en-us','Navigation'),(2791,'C1118','zh-cn','初始化'),(2792,'C1118','en-us','Init'),(2793,'C1119','zh-cn','上级'),(2794,'C1119','en-us','Parent'),(2795,'C1120','zh-cn','导航类型'),(2796,'C1120','en-us','Navigation type'),(2797,'C1121','zh-cn','导航数据来源'),(2798,'C1121','en-us','Navigation data sources'),(2799,'C1122','zh-cn','注意: 请谨慎执行该动作,该动作会将现有所有导航数据全部清理,同时,所有商品数据需要重新归类!'),(2800,'C1122','en-us','Note: Please be careful while doing this action, which will clean up all existing navigation data all at the same time, all product data need to re-classify!'),(2801,'C1123','zh-cn','内部商品分类'),(2802,'C1123','en-us','Internal Categories'),(2803,'C1124','zh-cn','请先选择商品导航'),(2804,'C1124','en-us','Please select product navigation'),(2805,'C1125','zh-cn','该商品导航与系统中的商品分类同步,不允许在此天添加属性!'),(2806,'C1125','en-us','This product navigation and commodity classification system synchronization is not allowed in this day add attributes!'),(2807,'C1126','zh-cn','在商品属性中不存在'),(2808,'C1126','en-us','Does not exist in the product properties'),(2809,'C1127','zh-cn','的属性值不允许为空'),(2810,'C1127','en-us','Attribute value does not allow nulls'),(2811,'C1128','zh-cn','在商品基本信息中不存在'),(2812,'C1128','en-us','Basic information on the product does not exist'),(2813,'C1129','zh-cn','SKU单元重复定义'),(2814,'C1129','en-us','SKU unit redefinition'),(2815,'C1130','zh-cn','在商品分类中不存在'),(2816,'C1130','en-us','Does not exist in the commodity classification'),(2817,'C1131','zh-cn','在品牌中不存在'),(2818,'C1131','en-us','Does not exist in the brand'),(2819,'C1132','zh-cn','智能图片更新'),(2820,'C1132','en-us','Intelligent Image updates'),(2821,'C1133','zh-cn','该报价条目已经存在,请重新输入'),(2822,'C1133','en-us','The quote entry already exists, please re-enter'),(2823,'C1134','zh-cn','图片Url'),(2824,'C1134','en-us','Picture Url'),(2825,'C1135','zh-cn','上传本地图片'),(2826,'C1135','en-us','Upload local images'),(2827,'C1136','zh-cn','设置图片Url'),(2828,'C1136','en-us','Set Photo Url'),(2829,'C1137','zh-cn','图片处理'),(2830,'C1137','en-us','Image processing'),(2831,'C1138','zh-cn','略缩图'),(2832,'C1138','en-us','Thumbnail'),(2833,'C1139','zh-cn','高清图'),(2834,'C1139','en-us','HD Photo'),(2835,'C1140','zh-cn','通用'),(2836,'C1140','en-us','Common'),(2837,'C1141','zh-cn','国家/区域'),(2838,'C1141','en-us','Country/Region'),(2839,'C1142','zh-cn','请先选择物流方案'),(2840,'C1142','en-us','Please select Logistics Solutions'),(2841,'C1143','zh-cn','绑定的物流方案'),(2842,'C1143','en-us','Bound logistics solutions'),(2843,'C1144','zh-cn','该物流方案被绑定在站点配送服务中，不允许被删除！'),(2844,'C1144','en-us','The logistics solution is bound to the commodity distribution services, can not be deleted!'),(2845,'C1145','zh-cn','利润发生变动, 需重新测算'),(2846,'C1145','en-us','Delivery service is missing'),(2847,'C1146','zh-cn','利润'),(2848,'C1146','en-us','Profit'),(2849,'C1147','zh-cn','商品描述文字或Html代码'),(2850,'C1147','en-us','Description text or Html code'),(2851,'C1148','zh-cn','站点应用'),(2852,'C1148','en-us','Site Available'),(2853,'C1149','zh-cn','应用'),(2854,'C1149','en-us','Available'),(2855,'C1150','zh-cn','未应用'),(2856,'C1150','en-us','UnUse'),(2857,'C1151','zh-cn','转出账号和转入账号一致,请重新选择'),(2858,'C1151','en-us','Account and transferred into the same account, please re-select'),(2859,'C1152','zh-cn','采购地址'),(2860,'C1152','en-us','Procurement address'),(2861,'C1153','zh-cn','采购价'),(2862,'C1153','en-us','PurchasePrice'),(2863,'C1154','zh-cn','采购周期(天)'),(2864,'C1154','en-us','Procurement cycle (days)'),(2865,'C1155','zh-cn','商品所在地'),(2866,'C1155','en-us','Merchandise location'),(2867,'C1156','zh-cn','是否删除'),(2868,'C1156','en-us','Whether to delete'),(2869,'C1157','zh-cn','临时采购'),(2870,'C1157','en-us','Temporary Procurement'),(2871,'C1158','zh-cn','供应商信息'),(2872,'C1158','en-us','Supplier Information'),(2873,'C1159','zh-cn','未询价产品'),(2874,'C1159','en-us','Subject Inquiry Product'),(2875,'C1160','zh-cn','导入排序'),(2876,'C1160','en-us','Importing sort'),(2877,'C1161','zh-cn','报价类型'),(2878,'C1161','en-us','Quote Type'),(2879,'C1162','zh-cn','商品SKU单元'),(2880,'C1162','en-us','Product Sku unit'),(2881,'C1163','zh-cn','采购周期'),(2882,'C1163','en-us','Procurement cycle'),(2883,'C1164','zh-cn','联系人'),(2884,'C1164','en-us','Contact'),(2885,'C1165','zh-cn','所在国家'),(2886,'C1165','en-us','Country'),(2887,'C1166','zh-cn','采购网址'),(2888,'C1166','en-us','Company Website'),(2889,'C1167','zh-cn','传真'),(2890,'C1167','en-us','Fax'),(2891,'C1168','zh-cn','联系地址'),(2892,'C1168','en-us','Address'),(2893,'C1169','zh-cn','职务'),(2894,'C1169','en-us','Position'),(2895,'C1170','zh-cn','采购区域'),(2896,'C1170','en-us','Procurement area'),(2897,'C1171','zh-cn','采购来源'),(2898,'C1171','en-us','Sources of procurement'),(2899,'C1172','zh-cn','更新报价'),(2900,'C1172','en-us','Updated quote'),(2901,'C1173','zh-cn','更新'),(2902,'C1173','en-us','Updates'),(2903,'C1174','zh-cn','临时报价'),(2904,'C1174','en-us','Temporary quote'),(2905,'C1175','zh-cn','供应商报价'),(2906,'C1175','en-us','Quotes from suppliers'),(2907,'C1176','zh-cn','采购报价'),(2908,'C1176','en-us','Procurement quote'),(2909,'C1177','zh-cn','供应商排序'),(2910,'C1177','en-us','Sort supplier'),(2911,'C1178','zh-cn','请选择供应商'),(2912,'C1178','en-us','Please select the vendor'),(2913,'C1179','zh-cn','该仓库已经存在,请重新输入!'),(2914,'C1179','en-us','The warehouse already exists, please re-enter!'),(2915,'C1180','zh-cn','上级仓库不允许位于该仓库内！'),(2916,'C1180','en-us','Superiors warehouse located in the warehouse is not allowed!'),(2917,'C1181','zh-cn','请先选择商品分类！'),(2918,'C1181','en-us','Please Select a product!'),(2919,'C1182','zh-cn','在仓库中不存在，请重新输入或选择！'),(2920,'C1182','en-us','In the warehouse does not exist, please re-enter or choose!'),(2921,'C1183','zh-cn','按件运费测算'),(2922,'C1183','en-us','Freight estimates by the piece'),(2923,'C1184','zh-cn','按重量运费测算'),(2924,'C1184','en-us','Measured by weight freight'),(2925,'C1185','zh-cn','商品首重或增重必须大于0'),(2926,'C1185','en-us','Goods first weight or gain weight must be greater than 0'),(2927,'C1186','zh-cn','该仓库内无该商品SKU单元,无法进行出库操作!'),(2928,'C1186','en-us','The warehouse without this product Sku unit operation can not be carried out of the library!'),(2929,'C1187','zh-cn','出库数量大于仓库内的商品库存数量,无法进行出库操作!'),(2930,'C1187','en-us','The library is greater than the number of goods within the warehouse stock quantity, can not be out of the library operation!'),(2931,'C1188','zh-cn','商品入库'),(2932,'C1188','en-us','Commodity storage'),(2933,'C1189','zh-cn','商品出库'),(2934,'C1189','en-us','Goods out of the library'),(2935,'C1190','zh-cn','库存转移'),(2936,'C1190','en-us','Stock Transfer'),(2937,'C1191','zh-cn','ECMS-商品仓储'),(2938,'C1191','en-us','ECMS-Inventory Management'),(2939,'C1192','zh-cn','出入库记录'),(2940,'C1192','en-us','Records out of storage'),(2941,'C1193','zh-cn','库存'),(2942,'C1193','en-us','Stock'),(2943,'C1194','zh-cn','商品出入库'),(2944,'C1194','en-us','Goods out of storage management'),(2945,'C1195','zh-cn','仓库管理'),(2946,'C1195','en-us','Warehouse Management'),(2947,'C1196','zh-cn','仓库'),(2948,'C1196','en-us','Warehouse'),(2949,'C1197','zh-cn','记录'),(2950,'C1197','en-us','Record'),(2951,'C1198','zh-cn','上层仓库'),(2952,'C1198','en-us','Upper Warehouse'),(2953,'C1199','zh-cn','仓库位置'),(2954,'C1199','en-us','Warehouse Locations'),(2955,'C1200','zh-cn','入库说明'),(2956,'C1200','en-us','Product From'),(2957,'C1201','zh-cn','出库说明'),(2958,'C1201','en-us','Product To'),(2959,'C1202','zh-cn','入库仓库'),(2960,'C1202','en-us','Storage warehouse'),(2961,'C1203','zh-cn','出库仓库'),(2962,'C1203','en-us','A repository of'),(2963,'C1204','zh-cn','操作时间'),(2964,'C1204','en-us','Time'),(2965,'C1205','zh-cn','商品SKU编码'),(2966,'C1205','en-us','Product SKU coding'),(2967,'C1206','zh-cn','商品出入库仓库不允许相同'),(2968,'C1206','en-us','Does not allow the same goods out of storage warehouse'),(2969,'C1207','zh-cn','动作'),(2970,'C1207','en-us','Action'),(2971,'C1208','zh-cn','详细说明'),(2972,'C1208','en-us','Detail'),(2973,'C1209','zh-cn','来源'),(2974,'C1209','en-us','From'),(2975,'C1210','zh-cn','去处'),(2976,'C1210','en-us','To'),(2977,'C1211','zh-cn','是否删除该记录'),(2978,'C1211','en-us','Whether to delete the record'),(2979,'C1212','zh-cn','请先选择仓库'),(2980,'C1212','en-us','Please select Warehouse'),(2981,'C1213','zh-cn','该商品在仓库中存在,不允许删除!'),(2982,'C1213','en-us','This product exists in the warehouse can not be deleted!'),(2983,'C1214','zh-cn','该商品SKU单元({0})在仓库中存在,不允许删除!'),(2984,'C1214','en-us','This product Sku unit ({0}) exists in the repository can not be deleted!'),(2985,'C1215','zh-cn','商品排序'),(2986,'C1215','en-us','Product Seq'),(2987,'C1216','zh-cn','商品排序只支持在商品分类的最底层进行操作'),(2988,'C1216','en-us','Sort products support only the lowest level of the commodity classification operation'),(2989,'C1217','zh-cn','图片识别码'),(2990,'C1217','en-us','Key'),(2991,'C1218','zh-cn','标准图'),(2992,'C1218','en-us','Standard Picture'),(2993,'C1219','zh-cn','清晰图'),(2994,'C1219','en-us','Source Picture'),(2995,'C1220','zh-cn','该商品与站点商品存在对应关系,无法被删除!'),(2996,'C1220','en-us','The existence of commodities and commodity correspondence between the station and can not be limited!'),(2997,'C1221','zh-cn','该商品存在库存,无法删除!'),(2998,'C1221','en-us','This product inventory exists, can not be deleted!'),(2999,'C1222','zh-cn','收货信息'),(3000,'C1222','en-us','Receiving information'),(3001,'C1223','zh-cn','所属国家'),(3002,'C1223','en-us','Country'),(3003,'C1224','zh-cn','注册站点'),(3004,'C1224','en-us','Registered sites'),(3005,'C1225','zh-cn','收货地址'),(3006,'C1225','en-us','Delivery Address'),(3007,'C1226','zh-cn','收件人'),(3008,'C1226','en-us','Receiver'),(3009,'C1227','zh-cn','省份/州'),(3010,'C1227','en-us','Province / State'),(3011,'C1228','zh-cn','邮政编码'),(3012,'C1228','en-us','PostCode'),(3013,'C1229','zh-cn','街道地址'),(3014,'C1229','en-us','Address'),(3015,'C1230','zh-cn','(第一行)'),(3016,'C1230','en-us','(First line)'),(3017,'C1231','zh-cn','(第二行)'),(3018,'C1231','en-us','(Second row)'),(3019,'C1232','zh-cn','街道地址的每行字符数不允许超过75个'),(3020,'C1232','en-us','Street address number of characters allowed per line over 75'),(3021,'C1233','zh-cn','已取消的费用'),(3022,'C1233','en-us','Cancel Fee'),(3023,'M0056','zh-cn','临时订单处理'),(3024,'M0056','en-us','Temp SaleOrder'),(3025,'C1234','zh-cn','该仓储在系统中不存在'),(3026,'C1234','en-us','The warehouse does not exist in the system'),(3027,'C1235','zh-cn','该商品编码在系统中不存在'),(3028,'C1235','en-us','The commodity code does not exist in the system'),(3029,'C1236','zh-cn','初始化库存'),(3030,'C1236','en-us','Initialization stock'),(3031,'C1237','zh-cn','配货名称'),(3032,'C1237','en-us','Picking names'),(3033,'C1238','zh-cn','报关名称(英文)'),(3034,'C1238','en-us','Customs names'),(3035,'C1239','zh-cn','报关价值'),(3036,'C1239','en-us','Customs Value'),(3037,'C1240','zh-cn','海关编码'),(3038,'C1240','en-us','Customs Code'),(3039,'C1241','zh-cn','原产地'),(3040,'C1241','en-us','Original ground'),(3041,'C1242','zh-cn','海关报关信息'),(3042,'C1242','en-us','Picking & Customs Information'),(3043,'C1243','zh-cn','请选择配送服务'),(3044,'C1243','en-us','Please select express service'),(3045,'C1244','zh-cn','请选择客户'),(3046,'C1244','en-us','Please select custome'),(3047,'C1245','zh-cn','报关材质'),(3048,'C1245','en-us','Material'),(3049,'C1246','zh-cn','物流配送处理'),(3050,'C1246','en-us','Product Distribute'),(3051,'C1247','zh-cn','商品净重'),(3052,'C1247','en-us','Product Weight'),(3053,'C1248','zh-cn','当月出货'),(3054,'C1248','en-us','Month delivery'),(3055,'C1249','zh-cn','累计出货'),(3056,'C1249','en-us','total delivery'),(3057,'C1250','zh-cn','设置商品包装'),(3058,'C1250','en-us','Set packaging'),(3059,'C1251','zh-cn','包装重量&体积'),(3060,'C1251','en-us','Package weight & volume'),(3061,'C1252','zh-cn','包装重量'),(3062,'C1252','en-us','Package weight'),(3063,'C1253','zh-cn','（包装盒的净重，不包含商品重量）'),(3064,'C1253','en-us','(Net weight of the box does not contain the product weight)'),(3065,'C1254','zh-cn','成本限制'),(3066,'C1254','en-us','Cost constraints'),(3067,'C1255','zh-cn','按体积测算'),(3068,'C1255','en-us','Volumn'),(3069,'C1256','zh-cn','售价及利润'),(3070,'C1256','en-us','Selling prices and profit'),(3071,'C1257','zh-cn','当月销量'),(3072,'C1257','en-us','Month sales'),(3073,'C1258','zh-cn','累计销量'),(3074,'C1258','en-us','Cumulative sales'),(3075,'C1259','zh-cn','上线时间'),(3076,'C1259','en-us','On-line time'),(3077,'C1260','zh-cn','增长率'),(3078,'C1260','en-us','Increase Rate'),(3079,'C1261','zh-cn','测算体积'),(3080,'C1261','en-us','Volumn'),(3081,'C1262','zh-cn','查看SKU库存'),(3082,'C1262','en-us','View SKu'),(3083,'C1263','zh-cn','商品SKU库存'),(3084,'C1263','en-us','Sku Inventory'),(3085,'C1264','zh-cn','产品'),(3086,'C1264','en-us','Product'),(3087,'C1265','zh-cn','不允许作为赠品'),(3088,'C1265','en-us','Allowed as a gift'),(3089,'C1266','zh-cn','出货仓库'),(3090,'C1266','en-us','Shipping warehouse'),(3091,'C1267','zh-cn','优先级'),(3092,'C1267','en-us','Priority'),(3093,'C1268','zh-cn','资费区域'),(3094,'C1268','en-us','Region'),(3095,'C1269','zh-cn','交运地址'),(3096,'C1269','en-us','Ship Address'),(3097,'C1270','zh-cn','此仓库为一级仓库，不允许修改其上层仓库'),(3098,'C1270','en-us','This warehouse is a warehouse, the warehouse is not allowed to modify its parent'),(3099,'C1271','zh-cn','此仓库不允许改为一级仓库'),(3100,'C1271','en-us','This does not allow the warehouse to a warehouse'),(3101,'C1272','zh-cn','的库存不足，无法在此配送中心进行打包出货'),(3102,'C1272','en-us','Lack of inventory, not in this warehouse packed shipments'),(3103,'C1273','zh-cn','订单问题处理'),(3104,'C1273','en-us','After Sale'),(3105,'C1274','zh-cn','配送中心'),(3106,'C1274','en-us','Distribution Center'),(3107,'C1275','zh-cn','查看销售统计'),(3108,'C1275','en-us','View Sale Stat'),(3109,'C1276','zh-cn','销售统计'),(3110,'C1276','en-us','Sale Stat'),(3111,'C1277','zh-cn','所在区域'),(3112,'C1277','en-us','Area'),(3113,'C1278','zh-cn','配送'),(3114,'C1278','en-us','Ship'),(3115,'C1279','zh-cn','待合并'),(3116,'C1279','en-us','Combin'),(3117,'C1280','zh-cn','待打包'),(3118,'C1280','en-us','Package'),(3119,'C1281','zh-cn','待交运'),(3120,'C1281','en-us','Delivery'),(3121,'C1282','zh-cn','运输中'),(3122,'C1282','en-us','Ship'),(3123,'C1283','zh-cn','待设置跟踪号'),(3124,'C1283','en-us','Set Tracking'),(3125,'C1284','zh-cn','待设置运费'),(3126,'C1284','en-us','Set Cost'),(3127,'C1285','zh-cn','待退件处理'),(3128,'C1285','en-us','Return'),(3129,'C1286','zh-cn','查询配送单'),(3130,'C1286','en-us','Query EO'),(3131,'C1287','zh-cn','包裹处理清单'),(3132,'C1287','en-us','Packages'),(3133,'C1288','zh-cn','打包清单'),(3134,'C1288','en-us','Packages'),(3135,'C1289','zh-cn','交运处理清单'),(3136,'C1289','en-us','Delivery List'),(3137,'C1290','zh-cn','进货仓库'),(3138,'C1290','en-us','StockIn Warehouse'),(3139,'C1291','zh-cn','物流商订单号'),(3140,'C1291','en-us','OutEOCode'),(3141,'C1292','zh-cn','实际重量'),(3142,'C1292','en-us','Weight'),(3143,'C1293','zh-cn','实际体积'),(3144,'C1293','en-us','Volumn'),(3145,'C1294','zh-cn','实际运费'),(3146,'C1294','en-us','Cost'),(3147,'C1295','zh-cn','快递跟踪号'),(3148,'C1295','en-us','Tracking Number'),(3149,'C1296','zh-cn','妥投日期'),(3150,'C1296','en-us','Delivery Time'),(3151,'C1297','zh-cn','拣货清单'),(3152,'C1297','en-us','Product'),(3153,'C1298','zh-cn','包裹清单'),(3154,'C1298','en-us','Package'),(3155,'C1299','zh-cn','配送单'),(3156,'C1299','en-us','Express Order'),(3157,'C1300','zh-cn','收货地址'),(3158,'C1300','en-us','Address'),(3159,'C1301','zh-cn','包裹重量'),(3160,'C1301','en-us','Weight'),(3161,'C1302','zh-cn','包裹体积'),(3162,'C1302','en-us','Volumn'),(3163,'C1303','zh-cn','发货日期'),(3164,'C1303','en-us','ShipTime'),(3165,'C1304','zh-cn','预计'),(3166,'C1304','en-us','Preview'),(3167,'C1305','zh-cn','到货日期'),(3168,'C1305','en-us','Arrive Time'),(3169,'C1306','zh-cn','海关报关'),(3170,'C1306','en-us','Custom'),(3171,'C1307','zh-cn','报关商品'),(3172,'C1307','en-us','Custom Product'),(3173,'C1308','zh-cn','合并前运费'),(3174,'C1308','en-us','Bef Cost'),(3175,'C1309','zh-cn','合并后运费'),(3176,'C1309','en-us','Aft Cost'),(3177,'C1310','zh-cn','报关价值'),(3178,'C1310','en-us','Custom Value'),(3179,'C1311','zh-cn','海关编码'),(3180,'C1311','en-us','Custom Code'),(3181,'C1312','zh-cn','申报产地'),(3182,'C1312','en-us','FactoryCountry'),(3183,'C1313','zh-cn','申报材质'),(3184,'C1313','en-us','Material'),(3185,'C1314','zh-cn','签收日期'),(3186,'C1314','en-us','Receive Time'),(3187,'C1315','zh-cn','客户订单号'),(3188,'C1315','en-us','Sale Order'),(3189,'C1316','zh-cn','配送单号'),(3190,'C1316','en-us','EOCode'),(3191,'C1317','zh-cn','配送区域'),(3192,'C1317','en-us','Area'),(3193,'C1318','zh-cn','配送内容'),(3194,'C1318','en-us','Express Content'),(3195,'C1319','zh-cn','测算'),(3196,'C1319','en-us','Cal'),(3197,'C1320','zh-cn','重量'),(3198,'C1320','en-us','Weight'),(3199,'C1321','zh-cn','合并'),(3200,'C1321','en-us','Combin'),(3201,'C1322','zh-cn','缺失'),(3202,'C1322','en-us','Lose'),(3203,'C1323','zh-cn','发货延期'),(3204,'C1323','en-us','Delay'),(3205,'C1324','zh-cn','预计发货'),(3206,'C1324','en-us','Pre Ship'),(3207,'C1325','zh-cn','到货延期'),(3208,'C1325','en-us','Delay'),(3209,'C1326','zh-cn','预计到货'),(3210,'C1326','en-us','Pre Arrive'),(3211,'C1327','zh-cn','跟踪号缺失'),(3212,'C1327','en-us','Track Lose'),(3213,'C1328','zh-cn','包裹丢失'),(3214,'C1328','en-us','Package Lose'),(3215,'C1329','zh-cn','物流退件'),(3216,'C1329','en-us','Lst Return'),(3217,'C1330','zh-cn','妥投'),(3218,'C1330','en-us','Deliveried'),(3219,'C1331','zh-cn','合并包裹'),(3220,'C1331','en-us','Combin Package'),(3221,'C1332','zh-cn','打包'),(3222,'C1332','en-us','Package'),(3223,'C1333','zh-cn','交运'),(3224,'C1333','en-us','Ship'),(3225,'C1334','zh-cn','拆分包裹'),(3226,'C1334','en-us','Split Package'),(3227,'C1335','zh-cn','重新打包'),(3228,'C1335','en-us','RePackage'),(3229,'C1336','zh-cn','丢包'),(3230,'C1336','en-us','Lose'),(3231,'C1337','zh-cn','退件'),(3232,'C1337','en-us','Return'),(3233,'C1338','zh-cn','设置跟踪号'),(3234,'C1338','en-us','Tracking Number'),(3235,'C1339','zh-cn','签收'),(3236,'C1339','en-us','Receive'),(3237,'C1340','zh-cn','退件已签收'),(3238,'C1340','en-us','Return & Receive'),(3239,'C1341','zh-cn','订单已经完成打包，进入交运阶段，准备提交给物流公司'),(3240,'C1341','en-us','..................'),(3241,'C1342','zh-cn','请选择'),(3242,'C1342','en-us','Please Select '),(3243,'C1343','zh-cn','订单终止交运处理，需要重新打包'),(3244,'C1343','en-us','..................'),(3245,'C1344','zh-cn','该订单包裹'),(3246,'C1344','en-us','..................'),(3247,'C1345','zh-cn','已经提交给物流公司'),(3248,'C1345','en-us','..................'),(3249,'C1346','zh-cn','物流方案是'),(3250,'C1346','en-us','..................'),(3251,'C1347','zh-cn','撤消包裹'),(3252,'C1347','en-us','Cancel Package'),(3253,'C1348','zh-cn','撤消配送单'),(3254,'C1348','en-us','..................'),(3255,'C1349','zh-cn','相关包裹的发货流程需要重新处理'),(3256,'C1349','en-us','..................'),(3257,'C1350','zh-cn','设置运费'),(3258,'C1350','en-us','Set Cost'),(3259,'C1351','zh-cn','必须大于0'),(3260,'C1351','en-us','..................'),(3261,'C1352','zh-cn','妥投日期不允许超过当前日期'),(3262,'C1352','en-us','..................'),(3263,'C1353','zh-cn','在快递途中丢失'),(3264,'C1353','en-us','..................'),(3265,'C1354','zh-cn','被物流公司退回'),(3266,'C1354','en-us','..................'),(3267,'C1355','zh-cn','请选择需要合并的配送单'),(3268,'C1355','en-us','..................'),(3269,'C1356','zh-cn','请输入包裹体积'),(3270,'C1356','en-us','..................'),(3271,'C1357','zh-cn','请选择配送中心'),(3272,'C1357','en-us','..................'),(3273,'C1358','zh-cn','存在延期风险'),(3274,'C1358','en-us','..................'),(3275,'C1359','zh-cn','合并的配送单不能只存在一个'),(3276,'C1359','en-us','..................'),(3277,'C1360','zh-cn','请选择物流方案'),(3278,'C1360','en-us','..................'),(3279,'C1361','zh-cn','计划发货日期不能小于当前日期'),(3280,'C1361','en-us','..................'),(3281,'C1362','zh-cn','计划到货日期不能小于计划到货日期'),(3282,'C1362','en-us','..................'),(3283,'C1363','zh-cn','拆分配送单'),(3284,'C1363','en-us','..................'),(3285,'C1364','zh-cn','查看包裹处理清单'),(3286,'C1364','en-us','..................'),(3287,'C1365','zh-cn','待处理总数'),(3288,'C1365','en-us','Sum'),(3289,'C1366','zh-cn','待打包数'),(3290,'C1366','en-us','Package Qty'),(3291,'C1367','zh-cn','待进货数'),(3292,'C1367','en-us','In Qty'),(3293,'C1368','zh-cn','产品总数'),(3294,'C1368','en-us','Product Qty'),(3295,'C1369','zh-cn','签收数量'),(3296,'C1369','en-us','Receive Qty'),(3297,'C1370','zh-cn','损坏数量'),(3298,'C1370','en-us','Lose Qty'),(3299,'C1371','zh-cn','签收退件'),(3300,'C1371','en-us','Receive RO'),(3301,'C1372','zh-cn','签收数量不能大于产品数量'),(3302,'C1372','en-us','..................'),(3303,'C1373','zh-cn','损坏数量不能大于签收数量'),(3304,'C1373','en-us','..................'),(3305,'C1374','zh-cn','签收日期不允许超过当前日期'),(3306,'C1374','en-us','..................'),(3307,'C1375','zh-cn','物流成本'),(3308,'C1375','en-us','LstSolution Cost'),(3309,'C1376','zh-cn','报关清单'),(3310,'C1376','en-us','Custom List'),(3311,'C1377','zh-cn','关联单号'),(3312,'C1377','en-us','Relation Order'),(3313,'C1378','zh-cn','物流退件'),(3314,'C1378','en-us','Return'),(3315,'C1379','zh-cn','库存不足'),(3316,'C1379','en-us','..................'),(3317,'C1380','zh-cn','在待打包的配送单中不存在'),(3318,'C1380','en-us','..................'),(3319,'C1381','zh-cn','在列表中重复'),(3320,'C1381','en-us','..................'),(3321,'C1382','zh-cn','交运统计'),(3322,'C1382','en-us','Delivery Stat'),(3323,'C1383','zh-cn','详细清单'),(3324,'C1383','en-us','List'),(3325,'C1384','zh-cn','是否交运'),(3326,'C1384','en-us','Is Delivery'),(3327,'C1385','zh-cn','产品问题数大于该客户订单可处理的售后产品数'),(3328,'C1385','en-us','..................'),(3329,'C1386','zh-cn','变更金额不允许小于当前已退款金额'),(3330,'C1386','en-us','..................'),(3331,'C1387','zh-cn','入库时间'),(3332,'C1387','en-us','StockIn Time'),(3333,'C1388','zh-cn','入库类型'),(3334,'C1388','en-us','StockType'),(3335,'C1389','zh-cn','待收产品列表'),(3336,'C1389','en-us','..................'),(3337,'C1390','zh-cn','入库数量'),(3338,'C1390','en-us','..................'),(3339,'C1391','zh-cn','待收数量'),(3340,'C1391','en-us','Receiving Qty'),(3341,'C1392','zh-cn','订单问题'),(3342,'C1392','en-us','AfterSale'),(3343,'C1393','zh-cn','采购订单'),(3344,'C1393','en-us','Purchase Order'),(3345,'C1394','zh-cn','采购入库'),(3346,'C1394','en-us','..................'),(3347,'C1395','zh-cn','订单问题退件'),(3348,'C1395','en-us','..................'),(3349,'C1396','zh-cn','该订单问题中不存在待收的产品'),(3350,'C1396','en-us','..................'),(3351,'C1397','zh-cn','出入库时间'),(3352,'C1397','en-us','..................'),(3353,'C1398','zh-cn','出库时间'),(3354,'C1398','en-us','..................'),(3355,'C1399','zh-cn','出库数量'),(3356,'C1399','en-us','Out Qty'),(3357,'C1400','zh-cn','转移数量'),(3358,'C1400','en-us','Transfer Qty'),(3359,'C1401','zh-cn','出入库类型'),(3360,'C1401','en-us','..................'),(3361,'C1402','zh-cn','该问题已经产生付款，无法降低此退款金额'),(3362,'C1402','en-us','..................'),(3363,'C1403','zh-cn','处理情况'),(3364,'C1403','en-us','Handle'),(3365,'C1404','zh-cn','客户订单号'),(3366,'C1404','en-us','SaleOrder'),(3367,'C1405','zh-cn','客户退件'),(3368,'C1405','en-us','CustReturn'),(3369,'C1406','zh-cn','提交日期'),(3370,'C1406','en-us','Submit Time'),(3371,'C1407','zh-cn','问题描述'),(3372,'C1407','en-us','Remark'),(3373,'C1408','zh-cn','处理选项'),(3374,'C1408','en-us','Handle Option'),(3375,'C1409','zh-cn','退款金额'),(3376,'C1409','en-us','Refund'),(3377,'C1410','zh-cn','处理说明'),(3378,'C1410','en-us','Handle Remark'),(3379,'C1411','zh-cn','退款处理'),(3380,'C1411','en-us','Refund State'),(3381,'C1412','zh-cn','补发货处理'),(3382,'C1412','en-us','Resend State'),(3383,'C1413','zh-cn','问题产品'),(3384,'C1413','en-us','Problem Product'),(3385,'C1414','zh-cn','问题数'),(3386,'C1414','en-us','Pb Qty'),(3387,'C1415','zh-cn','退件签收'),(3388,'C1415','en-us','Return Qty'),(3389,'C1416','zh-cn','退件数量'),(3390,'C1416','en-us','Return Qty'),(3391,'C1417','zh-cn','补发货数量'),(3392,'C1417','en-us','Resend Qty'),(3393,'C1418','zh-cn','商品质量缺陷'),(3394,'C1418','en-us','..................'),(3395,'C1419','zh-cn','商品描述不符合'),(3396,'C1419','en-us','..................'),(3397,'C1420','zh-cn','包裹损坏'),(3398,'C1420','en-us','..................'),(3399,'C1421','zh-cn','包裹内物品丢失'),(3400,'C1421','en-us','..................'),(3401,'C1422','zh-cn','需要'),(3402,'C1422','en-us','Need'),(3403,'C1423','zh-cn','不需要'),(3404,'C1423','en-us','No Need'),(3405,'C1424','zh-cn','未生效'),(3406,'C1424','en-us','No Avai'),(3407,'C1425','zh-cn','生效'),(3408,'C1425','en-us','Avai'),(3409,'C1426','zh-cn','解决'),(3410,'C1426','en-us','Finished'),(3411,'C1427','zh-cn','退款处理'),(3412,'C1427','en-us','Return Handle'),(3413,'C1428','zh-cn','补发货处理'),(3414,'C1428','en-us','Resend Handle'),(3415,'C1429','zh-cn','退款&补发货处理'),(3416,'C1429','en-us','Return&Resend Handle'),(3417,'C1430','zh-cn','待生效'),(3418,'C1430','en-us','Avai'),(3419,'C1431','zh-cn','待客户退件'),(3420,'C1431','en-us','..................'),(3421,'C1432','zh-cn','处理中'),(3422,'C1432','en-us','Handling'),(3423,'C1433','zh-cn','问题'),(3424,'C1433','en-us','Problem'),(3425,'C1434','zh-cn','问题处理'),(3426,'C1434','en-us','Problem Handle'),(3427,'C1435','zh-cn','客户订单'),(3428,'C1435','en-us','Sale Order'),(3429,'C1436','zh-cn','设置地址'),(3430,'C1436','en-us','Set Address'),(3431,'C1437','zh-cn','地址'),(3432,'C1437','en-us','Address'),(3433,'C1438','zh-cn','产品签收'),(3434,'C1438','en-us','Receive'),(3435,'C1439','zh-cn','客户关键字'),(3436,'C1439','en-us','Cust Key'),(3437,'C1440','zh-cn','订单问题号'),(3438,'C1440','en-us','ASPCode'),(3439,'C1441','zh-cn','客户&订单'),(3440,'C1441','en-us','Customer&Order'),(3441,'C1442','zh-cn','补发货'),(3442,'C1442','en-us','Resend'),(3443,'C1443','zh-cn','待签收'),(3444,'C1443','en-us','Wait Receive'),(3445,'C1444','zh-cn','部分签收'),(3446,'C1444','en-us','Half Receive'),(3447,'C1445','zh-cn','已签收'),(3448,'C1445','en-us','Received'),(3449,'C1446','zh-cn','退件丢失'),(3450,'C1446','en-us','Receive Lose'),(3451,'C1447','zh-cn','部分丢失'),(3452,'C1447','en-us','Half Lose'),(3453,'C1448','zh-cn','未退款'),(3454,'C1448','en-us','Un Refund'),(3455,'C1449','zh-cn','退款中'),(3456,'C1449','en-us','Refunding'),(3457,'C1450','zh-cn','退款完成'),(3458,'C1450','en-us','Refunded'),(3459,'C1451','zh-cn','处理'),(3460,'C1451','en-us','Handle'),(3461,'C1452','zh-cn','变更'),(3462,'C1452','en-us','Modify'),(3463,'C1453','zh-cn','变更退款'),(3464,'C1453','en-us','Modify Refund'),(3465,'C1454','zh-cn','撤消退款'),(3466,'C1454','en-us','Cancel Refund'),(3467,'C1455','zh-cn','完成'),(3468,'C1455','en-us','Finished'),(3469,'C1456','zh-cn','产品数'),(3470,'C1456','en-us','Product Qty'),(3471,'C1457','zh-cn','收货人'),(3472,'C1457','en-us','Receiver'),(3473,'C1458','zh-cn','该客户的收货地址缺失'),(3474,'C1458','en-us','..................'),(3475,'C1459','zh-cn','问题数不能大于产品数'),(3476,'C1459','en-us','..................'),(3477,'C1460','zh-cn','退件数量不允许大于问题数'),(3478,'C1460','en-us','..................'),(3479,'C1461','zh-cn','补发货数量不允许大于问题数'),(3480,'C1461','en-us','..................'),(3481,'C1462','zh-cn','生效日期'),(3482,'C1462','en-us','Submit Time'),(3483,'C1463','zh-cn','交运日期'),(3484,'C1463','en-us','Ship Time'),(3485,'C1464','zh-cn','妥投日期'),(3486,'C1464','en-us','Finish Time'),(3487,'C1465','zh-cn','计划发货日期格式不正确'),(3488,'C1465','en-us','..................'),(3489,'C1466','zh-cn','计划发货日期'),(3490,'C1466','en-us','Plan Ship Time'),(3491,'C1467','zh-cn','计划到货日期'),(3492,'C1467','en-us','Plan Arrive Time'),(3493,'C1468','zh-cn','计划到货日期格式不正确'),(3494,'C1468','en-us','..................'),(3495,'C1469','zh-cn','计划发货日期不能小于提交日期'),(3496,'C1469','en-us','..................'),(3497,'C1470','zh-cn','计划发货日期不能小于计划到货日期'),(3498,'C1470','en-us','..................'),(3499,'C1471','zh-cn','生效处理'),(3500,'C1471','en-us','..................'),(3501,'C1472','zh-cn','是否生效该问题'),(3502,'C1472','en-us','..................'),(3503,'C1473','zh-cn','进入处理阶段'),(3504,'C1473','en-us','..................'),(3505,'C1474','zh-cn','解决问题'),(3506,'C1474','en-us','Solve Problem'),(3507,'C1475','zh-cn','是否已经解决该问题'),(3508,'C1475','en-us','..................'),(3509,'C1476','zh-cn','关闭此问题'),(3510,'C1476','en-us','..................'),(3511,'C1477','zh-cn','变更金额'),(3512,'C1477','en-us','Modify Refund'),(3513,'C1478','zh-cn','撤消退款'),(3514,'C1478','en-us','Cancel Refund'),(3515,'C1479','zh-cn','是否撤消或终止该问题'),(3516,'C1479','en-us','..................'),(3517,'C1480','zh-cn','的退款流程'),(3518,'C1480','en-us','..................'),(3519,'C1481','zh-cn','撤消问题'),(3520,'C1481','en-us','Cancel Problem'),(3521,'C1482','zh-cn','是否关闭该问题'),(3522,'C1482','en-us','..................'),(3523,'C1483','zh-cn','该问题'),(3524,'C1483','en-us','This Problem'),(3525,'C1484','zh-cn','的客户退件是否丢失,关闭收件流程'),(3526,'C1484','en-us','..................'),(3527,'C1485','zh-cn','订单信息'),(3528,'C1485','en-us','SaleOrder'),(3529,'C1486','zh-cn','配送信息'),(3530,'C1486','en-us','Express Info'),(3531,'C1487','zh-cn','配送处理'),(3532,'C1487','en-us','Express Handle'),(3533,'C1488','zh-cn','财务处理'),(3534,'C1488','en-us','Finance Handle'),(3535,'C1489','zh-cn','问题处理'),(3536,'C1489','en-us','AfterSale'),(3537,'C1490','zh-cn','销售日期'),(3538,'C1490','en-us','Sale Time'),(3539,'C1491','zh-cn','配送服务价格'),(3540,'C1491','en-us','Express Price'),(3541,'C1492','zh-cn','配送服务成本'),(3542,'C1492','en-us','Express Cost'),(3543,'C1493','zh-cn','目录价'),(3544,'C1493','en-us','List Price'),(3545,'C1494','zh-cn','单价'),(3546,'C1494','en-us','Sale Price'),(3547,'C1495','zh-cn','账单类型'),(3548,'C1495','en-us','Type'),(3549,'C1496','zh-cn','未确认'),(3550,'C1496','en-us','UnConfirm'),(3551,'C1497','zh-cn','变更未确认'),(3552,'C1497','en-us','Change UnConfirm'),(3553,'C1498','zh-cn','客户确认'),(3554,'C1498','en-us','Confrim'),(3555,'C1499','zh-cn','应收账单'),(3556,'C1499','en-us','Receive Order'),(3557,'C1500','zh-cn','应付账单'),(3558,'C1500','en-us','Pay Order'),(3559,'C1501','zh-cn','待客户确认'),(3560,'C1501','en-us','..................'),(3561,'C1502','zh-cn','待发货'),(3562,'C1502','en-us','..................'),(3563,'C1503','zh-cn','丢包&退件处理'),(3564,'C1503','en-us','..................'),(3565,'C1504','zh-cn','查询订单'),(3566,'C1504','en-us','..................'),(3567,'C1505','zh-cn','订单'),(3568,'C1505','en-us','Order'),(3569,'C1506','zh-cn','导入外部订单'),(3570,'C1506','en-us','Import Order'),(3571,'C1507','zh-cn','配送&备注'),(3572,'C1507','en-us','..................'),(3573,'C1508','zh-cn','利润测算'),(3574,'C1508','en-us','Profit'),(3575,'C1509','zh-cn','交易货币'),(3576,'C1509','en-us','Currency'),(3577,'C1510','zh-cn','订单总金额'),(3578,'C1510','en-us','..................'),(3579,'C1511','zh-cn','商品价格'),(3580,'C1511','en-us','..................'),(3581,'C1512','zh-cn','订单总成本'),(3582,'C1512','en-us','..................'),(3583,'C1513','zh-cn','其他成本'),(3584,'C1513','en-us','Other Cost'),(3585,'C1514','zh-cn','订单利润'),(3586,'C1514','en-us','Profit'),(3587,'C1515','zh-cn','站点导航'),(3588,'C1515','en-us','..................'),(3589,'C1516','zh-cn','销售区域'),(3590,'C1516','en-us','..................'),(3591,'C1517','zh-cn','订单内容'),(3592,'C1517','en-us','Content'),(3593,'C1518','zh-cn','占比'),(3594,'C1518','en-us','..................'),(3595,'C1519','zh-cn','待收款'),(3596,'C1519','en-us','..................'),(3597,'C1520','zh-cn','待退款'),(3598,'C1520','en-us','..................'),(3599,'C1521','zh-cn','重复发货'),(3600,'C1521','en-us','Repeat Ship'),(3601,'C1522','zh-cn','变更订单'),(3602,'C1522','en-us','Modify Order'),(3603,'C1523','zh-cn','撤消订单'),(3604,'C1523','en-us','Cancel Order'),(3605,'C1524','zh-cn','生效订单'),(3606,'C1524','en-us','Submit Order'),(3607,'C1525','zh-cn','全额退款'),(3608,'C1525','en-us','..................'),(3609,'C1526','zh-cn','重新发货'),(3610,'C1526','en-us','..................'),(3611,'C1527','zh-cn','请先添加商品'),(3612,'C1527','en-us','..................'),(3613,'C1528','zh-cn','请设置客户收货地址'),(3614,'C1528','en-us','..................'),(3615,'C1529','zh-cn','成本'),(3616,'C1529','en-us','Cost'),(3617,'C1530','zh-cn','标配'),(3618,'C1530','en-us','Standard'),(3619,'C1531','zh-cn','内部商品的标配量必须大于0'),(3620,'C1531','en-us','..................'),(3621,'C1532','zh-cn','销售日期格式不正确'),(3622,'C1532','en-us','..................'),(3623,'C1533','zh-cn','销售日期不允许超过当前日期'),(3624,'C1533','en-us','..................'),(3625,'C1534','zh-cn','的关联内部商品不允许为空'),(3626,'C1534','en-us','..................'),(3627,'C1535','zh-cn','计划发货日期不能小于销售日期'),(3628,'C1535','en-us','..................'),(3629,'C1536','zh-cn','客户确认日期格式不正确'),(3630,'C1536','en-us','..................'),(3631,'C1537','zh-cn','客户确认日期不允许小于销售日期'),(3632,'C1537','en-us','..................'),(3633,'C1538','zh-cn','客户确认日期不允许超过当前日期'),(3634,'C1538','en-us','..................'),(3635,'C1539','zh-cn','生效日期格式不正确'),(3636,'C1539','en-us','..................'),(3637,'C1540','zh-cn','生效日期不允许小于客户确认日期'),(3638,'C1540','en-us','..................'),(3639,'C1541','zh-cn','生效日期不允许超过当前日期'),(3640,'C1541','en-us','..................'),(3641,'C1542','zh-cn','是否撤消该订单'),(3642,'C1542','en-us','..................'),(3643,'C1543','zh-cn','采购计划'),(3644,'C1543','en-us','Request'),(3645,'C1544','zh-cn','在该列表中存在重复数据'),(3646,'C1544','en-us','..................'),(3647,'C1545','zh-cn','是否删除该支出账单'),(3648,'C1545','en-us','..................'),(3649,'C1546','zh-cn','问题单号'),(3650,'C1546','en-us','Problem Code'),(3651,'C1547','zh-cn','该采购订单中不存在待收的产品'),(3652,'C1547','en-us','..................'),(3653,'C1548','zh-cn','终止'),(3654,'C1548','en-us','Abort'),(3655,'C1549','zh-cn','是否终止该应收账单'),(3656,'C1549','en-us','..................'),(3657,'C1550','zh-cn','配送日期'),(3658,'C1550','en-us','Express Date'),(3659,'C1551','zh-cn','价格小计'),(3660,'C1551','en-us','TotalPrice'),(3661,'C1552','zh-cn','处理完成'),(3662,'C1552','en-us','Finished'),(3663,'C1553','zh-cn','是否生效'),(3664,'C1553','en-us','Is Submit'),(3665,'C1554','zh-cn','在待生效的客户订单中不存在'),(3666,'C1554','en-us','..................'),(3667,'C1555','zh-cn','待生效订单'),(3668,'C1555','en-us','Wait Submit Order'),(3669,'C1556','zh-cn','问题类型'),(3670,'C1556','en-us','Problem Type'),(3671,'C1557','zh-cn','关闭'),(3672,'C1557','en-us','Close'),(3673,'C1558','zh-cn','是否终止财务处理，关闭此订单'),(3674,'C1558','en-us','..................'),(3675,'C1559','zh-cn','无理由退货'),(3676,'C1559','en-us','..................'),(3677,'C1560','zh-cn','额外赔偿'),(3678,'C1560','en-us','..................'),(3679,'C1561','zh-cn','订单数'),(3680,'C1561','en-us','Qty'),(3681,'C1562','zh-cn','发货'),(3682,'C1562','en-us','Send'),(3683,'C1563','zh-cn','问题数不允许小于退件签收数量'),(3684,'C1563','en-us','..................'),(3685,'C1564','zh-cn','已收款'),(3686,'C1564','en-us','Received'),(3687,'C1565','zh-cn','产品处理'),(3688,'C1565','en-us','Product Handle'),(3689,'C1566','zh-cn','采购计划&执行'),(3690,'C1566','en-us','Purchase Plan'),(3691,'C1567','zh-cn','采购'),(3692,'C1567','en-us','Purchase'),(3693,'C1568','zh-cn','采购计划数'),(3694,'C1568','en-us','Request Qty'),(3695,'C1569','zh-cn','采购日期'),(3696,'C1569','en-us','Purchase Time'),(3697,'C1570','zh-cn','交货方式'),(3698,'C1570','en-us','Delivery Remark'),(3699,'C1571','zh-cn','采购金额'),(3700,'C1571','en-us','Purchase Price'),(3701,'C1572','zh-cn','采购计划'),(3702,'C1572','en-us','Purchase Plan'),(3703,'C1573','zh-cn','待收货'),(3704,'C1573','en-us','..................'),(3705,'C1574','zh-cn','待采购'),(3706,'C1574','en-us','..................'),(3707,'C1575','zh-cn','采购建议'),(3708,'C1575','en-us','..................'),(3709,'C1576','zh-cn','紧急采购'),(3710,'C1576','en-us','..................'),(3711,'C1577','zh-cn','变更计划'),(3712,'C1577','en-us','..................'),(3713,'C1578','zh-cn','该商品已存在采购计划'),(3714,'C1578','en-us','..................'),(3715,'C1579','zh-cn','交货情况'),(3716,'C1579','en-us','..................'),(3717,'C1580','zh-cn','负责人'),(3718,'C1580','en-us','..................'),(3719,'C1581','zh-cn','待付款'),(3720,'C1581','en-us','..................'),(3721,'C1582','zh-cn','交货完成'),(3722,'C1582','en-us','..................'),(3723,'C1583','zh-cn','未交货'),(3724,'C1583','en-us','..................'),(3725,'C1584','zh-cn','交货量'),(3726,'C1584','en-us','..................'),(3727,'C1585','zh-cn','到货'),(3728,'C1585','en-us','Arrive'),(3729,'C1586','zh-cn','询价'),(3730,'C1586','en-us','Ask Price'),(3731,'C1587','zh-cn','签收数'),(3732,'C1587','en-us','Qty'),(3733,'C1588','zh-cn','变更数量不能小于已签收数量'),(3734,'C1588','en-us','..................'),(3735,'C1589','zh-cn','计划到货日期不能小于采购日期'),(3736,'C1589','en-us','..................'),(3737,'C1590','zh-cn','是否生效该采购订单'),(3738,'C1590','en-us','..................'),(3739,'C1591','zh-cn','是否关闭该采购订单'),(3740,'C1591','en-us','..................'),(3741,'C1592','zh-cn','生成采购计划'),(3742,'C1592','en-us','Generate Plan'),(3743,'C1593','zh-cn','供应商&询价'),(3744,'C1593','en-us','Supplier'),(3745,'C1594','zh-cn','标准采购'),(3746,'C1594','en-us','Standard'),(3747,'C1595','zh-cn','临时采购'),(3748,'C1595','en-us','Temp'),(3749,'C1596','zh-cn','订单类型'),(3750,'C1596','en-us','Order Type'),(3751,'C1597','zh-cn','快递送货'),(3752,'C1597','en-us','Express Delivery'),(3753,'C1598','zh-cn','上门提货'),(3754,'C1598','en-us','Home Delivery'),(3755,'C1599','zh-cn','交货地址'),(3756,'C1599','en-us','Express Address'),(3757,'C1600','zh-cn','现场采购&发货'),(3758,'C1600','en-us','..................'),(3759,'C1601','zh-cn','处理清单'),(3760,'C1601','en-us','List'),(3761,'C1602','zh-cn','订单价'),(3762,'C1602','en-us','Order Price'),(3763,'C1603','zh-cn','采购单价'),(3764,'C1603','en-us','Purchase Price'),(3765,'C1604','zh-cn','该行数据重复'),(3766,'C1604','en-us','..................'),(3767,'C1605','zh-cn','该配送订单在系统中不存在'),(3768,'C1605','en-us','..................'),(3769,'C1606','zh-cn','该入库仓库在系统中不存在'),(3770,'C1606','en-us','..................'),(3771,'C1607','zh-cn','该供应商在系统中不存在'),(3772,'C1607','en-us','..................'),(3773,'C1608','zh-cn','该商品在系统中不存在'),(3774,'C1608','en-us','..................'),(3775,'C1609','zh-cn','该采购订单号在系统中不存在'),(3776,'C1609','en-us','..................'),(3777,'C1610','zh-cn','该商品与该采购订单号不匹配'),(3778,'C1610','en-us','..................'),(3779,'C1611','zh-cn','该供应商与该采购订单号不匹配'),(3780,'C1611','en-us','..................'),(3781,'C1612','zh-cn','数量大于订单数量'),(3782,'C1612','en-us','..................'),(3783,'C1613','zh-cn','采购价格与订单价格不一致'),(3784,'C1613','en-us','..................'),(3785,'C1614','zh-cn','入库数量不允许大于采购数量'),(3786,'C1614','en-us','..................'),(3787,'C1615','zh-cn','商品出入库数量不一致'),(3788,'C1615','en-us','..................'),(3789,'C1616','zh-cn','库存资金'),(3790,'C1616','en-us','Inventory Money'),(3791,'C1617','zh-cn','统计'),(3792,'C1617','en-us','Stat'),(3793,'C1618','zh-cn','资金占比'),(3794,'C1618','en-us','Percent'),(3795,'C1619','zh-cn','安全库存'),(3796,'C1619','en-us','Stock'),(3797,'C1620','zh-cn','批量处理'),(3798,'C1620','en-us','Batch Handle'),(3799,'C1621','zh-cn','报关名称(中文)'),(3800,'C1621','en-us','CustomName'),(3801,'C1622','zh-cn','打印订单'),(3802,'C1622','en-us','Print'),(3803,'C1623','zh-cn','订单处理'),(3804,'C1623','en-us','Handle Order'),(3805,'C1624','zh-cn','邮件处理'),(3806,'C1624','en-us','Email Handle'),(3807,'C1625','zh-cn','客户订单追踪'),(3808,'C1625','en-us','Order Track'),(3809,'C1626','zh-cn','邮件'),(3810,'C1626','en-us','Email'),(3811,'C1627','zh-cn','发送邮件'),(3812,'C1627','en-us','Send Email'),(3813,'C1628','zh-cn','发送状态'),(3814,'C1628','en-us','State'),(3815,'C1629','zh-cn','邮件类型'),(3816,'C1629','en-us','Email Type'),(3817,'C1630','zh-cn','订单生效通知'),(3818,'C1630','en-us','Avai Notice'),(3819,'C1631','zh-cn','发货通知'),(3820,'C1631','en-us','Ship Notice'),(3821,'C1632','zh-cn','收货反馈'),(3822,'C1632','en-us','Receive Feedback'),(3823,'C1633','zh-cn','交易完成通知'),(3824,'C1633','en-us','Finish Notice'),(3825,'C1634','zh-cn','邮件标题'),(3826,'C1634','en-us','Email Title'),(3827,'C1635','zh-cn','创建时间'),(3828,'C1635','en-us','Create Time'),(3829,'C1636','zh-cn','发送时间'),(3830,'C1636','en-us','Send Time'),(3831,'C1637','zh-cn','已发送'),(3832,'C1637','en-us','Send'),(3833,'C1638','zh-cn','待发送'),(3834,'C1638','en-us','Wait'),(3835,'C1639','zh-cn','发送包裹妥投邮件给客户'),(3836,'C1639','en-us','......'),(3839,'C1641','zh-cn','格式异常'),(3840,'C1641','en-us','error'),(3841,'C1642','zh-cn','赠品识别码'),(3842,'C1642','en-us','Key'),(3843,'C1643','zh-cn','商品的SKU单元与 SKU单元-Sheet表中的数量不匹配 '),(3844,'C1643','en-us','......'),(3847,'C1640','zh-cn','网站搜索关键字(Tags)'),(3848,'C1640','en-us','Tags'),(3849,'C1644','zh-cn','导入SMT订单'),(3850,'C1644','en-us','Import SMT Order'),(3851,'C1645','zh-cn','导入递四方预报单'),(3852,'C1645','en-us','Import 4PX Order'),(3853,'C1646','zh-cn','导出SMT填报信息'),(3854,'C1646','en-us','Export SMT TrackingNumber'),(3855,'C1647','zh-cn','导入SMT运费'),(3856,'C1647','en-us','Import SMT Charge'),(3857,'C1648','zh-cn','导入4PX运费'),(3858,'C1648','en-us','Import 4PX Charge'),(3859,'C1649','zh-cn','导出实际运费'),(3860,'C1649','en-us','Export Actual Cost'),(3861,'C1650','zh-cn','导出Wish商品'),(3862,'C1650','en-us','Export Wish Products'),(3863,'C1651','zh-cn','导入淘宝订单'),(3864,'C1651','en-us','Import Taobao Order'),(3865,'C1652','zh-cn','库存成本'),(3866,'C1652','en-us','Inventory'),(3867,'C1653','zh-cn','销售统计分析'),(3868,'C1653','en-us','Sale Stat'),(3869,'C1654','zh-cn','导出历史采购记录'),(3870,'C1654','en-us','Export Products'),(3871,'C1655','zh-cn','生成待采购商品'),(3872,'C1655','en-us','Generate Product'),(3873,'C1656','zh-cn','导出备货清单'),(3874,'C1656','en-us','Export Product'),(3875,'C1657','zh-cn','是否导出图片'),(3876,'C1657','en-us','With Picture'),(3877,'C1658','zh-cn','待签收商品'),(3878,'C1658','en-us','Product'),(3879,'C1659','zh-cn','中通快递单号'),(3880,'C1659','en-us','Code'),(3881,'C1660','zh-cn','全网销售额'),(3882,'C1660','en-us','Sale'),(3883,'C1661','zh-cn','全网订单量'),(3884,'C1661','en-us','Order Number'),(3885,'C1662','zh-cn','全网利润'),(3886,'C1662','en-us','Profit'),(3887,'C1663','zh-cn','站点订单量'),(3888,'C1663','en-us','Site Order'),(3889,'C1664','zh-cn','站点销售额&利润'),(3890,'C1664','en-us','Site Profit'),(3891,'C1665','zh-cn','商品分析'),(3892,'C1665','en-us','Product Analysis'),(3893,'C1666','zh-cn','商品分析监控'),(3894,'C1666','en-us','Product Track'),(3895,'C1667','zh-cn','商品分析对象'),(3896,'C1667','en-us','Analysis Obj'),(3897,'C1668','zh-cn','统计'),(3898,'C1668','en-us','Stat'),(3899,'C1669','zh-cn','SMT-电子产品&配件'),(3900,'C1669','en-us','SMT-Elec'),(3901,'C1670','zh-cn','淘宝-电子产品&配件'),(3902,'C1670','en-us','TB-Elec'),(3903,'C1671','zh-cn','ebay-电子产品&配件'),(3904,'C1671','en-us','ebay-Elec'),(3905,'C1672','zh-cn','视图'),(3906,'C1672','en-us','View'),(3907,'C1673','zh-cn','数据统计'),(3908,'C1673','en-us','Stat'),(3909,'C1674','zh-cn','销售时间分布'),(3910,'C1674','en-us','Time'),(3911,'C1675','zh-cn','销售区域分布'),(3912,'C1675','en-us','Area'),(3913,'C1676','zh-cn','销售额区域分布'),(3914,'C1676','en-us','Sale Price'),(3915,'C1677','zh-cn','总利润区域分布'),(3916,'C1677','en-us','Profit'),(3917,'C1678','zh-cn','每件利润区域分布'),(3918,'C1678','en-us','Every Profit'),(3919,'C1679','zh-cn','商品销量'),(3920,'C1679','en-us','Product Sale'),(3921,'C1680','zh-cn','统计数据'),(3922,'C1680','en-us','Stat Data'),(3923,'C1681','zh-cn','导出'),(3924,'C1681','en-us','Export'),(3925,'C1682','zh-cn','营销成本'),(3926,'C1682','en-us','Market Cost'),(3927,'C1683','zh-cn','导入'),(3928,'C1683','en-us','Import'),(3929,'C1684','zh-cn','商品分析监控'),(3930,'C1684','en-us','Track'),(3931,'C1685','zh-cn','数据'),(3932,'C1685','en-us','Data'),(3933,'C1686','zh-cn','输出分析数据'),(3934,'C1686','en-us','Output Analysis'),(3935,'C1687','zh-cn','原数据文件'),(3936,'C1687','en-us','File'),(3937,'C1689','zh-cn','时间段'),(3938,'C1689','en-us','Time'),(3939,'C1690','zh-cn','对象类型'),(3940,'C1690','en-us','ObjType'),(3941,'C1691','zh-cn','销售分析'),(3942,'C1691','en-us','Sale Analysis'),(3943,'C1692','zh-cn','销售价格分析'),(3944,'C1692','en-us','Price Analysis'),(3945,'C1693','zh-cn','分析'),(3946,'C1693','en-us','Analysis'),(3947,'C1694','zh-cn','监控类型'),(3948,'C1694','en-us','Track Type'),(3949,'C1695','zh-cn','监控周期'),(3950,'C1695','en-us','Track Pirend'),(3951,'C1696','zh-cn','全网销量统计'),(3952,'C1696','en-us','Stat'),(3953,'C1697','zh-cn','全网销售额统计'),(3954,'C1697','en-us','Stat'),(3955,'C1698','zh-cn','站点销量'),(3956,'C1698','en-us','Site Sale'),(3957,'C1699','zh-cn','销售额'),(3958,'C1699','en-us','Sale Price'),(3959,'C1700','zh-cn','销量'),(3960,'C1700','en-us','Qty'),(3961,'C1701','zh-cn','日均销量'),(3962,'C1701','en-us','Day Qty'),(3963,'C1702','zh-cn','销量均价'),(3964,'C1702','en-us','Price'),(3965,'C1703','zh-cn','推广费用'),(3966,'C1703','en-us','Cost'),(3967,'C1704','zh-cn','总利润'),(3968,'C1704','en-us','Total Profit'),(3969,'C1705','zh-cn','利润率'),(3970,'C1705','en-us','Profit Rate'),(3971,'C1706','zh-cn','查看详细统计数据'),(3972,'C1706','en-us','View'),(3973,'C1707','zh-cn','销量统计视图'),(3974,'C1707','en-us','Sale View'),(3975,'C1708','zh-cn','销售额统计视图'),(3976,'C1708','en-us','Sale View'),(3977,'C1709','zh-cn','总销量'),(3978,'C1709','en-us','Sale'),(3979,'C1710','zh-cn','销售均价'),(3980,'C1710','en-us','Price'),(3981,'C1711','zh-cn','销量均价及利润视图'),(3982,'C1711','en-us','View'),(3983,'C1712','zh-cn','销量分布'),(3984,'C1712','en-us','Sale'),(3985,'C1713','zh-cn','平均利润'),(3986,'C1713','en-us','Profit'),(3987,'C1714','zh-cn','目标'),(3988,'C1714','en-us','Target'),(3989,'C1715','zh-cn','开始时间不允许为空'),(3990,'C1715','en-us','...'),(3991,'C1716','zh-cn','监控周期必须大于0'),(3992,'C1716','en-us','...'),(3993,'C1717','zh-cn','简写'),(3994,'C1717','en-us','Code'),(3995,'C1718','zh-cn','未到账'),(3996,'C1718','en-us','....'),(3997,'C1719','zh-cn','异常订单'),(3998,'C1719','en-us','....'),(3999,'C1720','zh-cn','申请取消'),(4000,'C1720','en-us','....'),(4001,'C1721','zh-cn','待生成发货标签'),(4002,'C1721','en-us','....'),(4003,'C1722','zh-cn','待生成跟踪号'),(4004,'C1722','en-us','....'),(4005,'C1723','zh-cn','生成SMT发货标签'),(4006,'C1723','en-us','....'),(4007,'C1724','zh-cn','生成SMT跟踪号'),(4008,'C1724','en-us','....');
/*!40000 ALTER TABLE `sysvalue_res` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sysweightunit`
--

DROP TABLE IF EXISTS `sysweightunit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sysweightunit` (
  `SysWeightUnit_Id` int(11) NOT NULL,
  `WUnit` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`SysWeightUnit_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sysweightunit`
--

LOCK TABLES `sysweightunit` WRITE;
/*!40000 ALTER TABLE `sysweightunit` DISABLE KEYS */;
INSERT INTO `sysweightunit` VALUES (1,'kg'),(2,'lb'),(3,'oz'),(4,'ct');
/*!40000 ALTER TABLE `sysweightunit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sysweightunit_rate`
--

DROP TABLE IF EXISTS `sysweightunit_rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sysweightunit_rate` (
  `SysWeightUnit_Rate_Id` int(11) NOT NULL,
  `SysWeightUnit_Id_1` int(11) DEFAULT NULL,
  `SysWeightUnit_Id_2` int(11) DEFAULT NULL,
  `RateValue` decimal(18,8) DEFAULT NULL,
  PRIMARY KEY (`SysWeightUnit_Rate_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sysweightunit_rate`
--

LOCK TABLES `sysweightunit_rate` WRITE;
/*!40000 ALTER TABLE `sysweightunit_rate` DISABLE KEYS */;
INSERT INTO `sysweightunit_rate` VALUES (1,1,2,2.20000000),(2,1,3,35.27000000),(3,1,4,5000.00000000),(4,2,1,0.45000000),(5,2,3,16.00000000),(6,2,4,2267.96000000),(7,3,1,0.02830000),(8,3,2,0.06250000),(9,3,4,141.74760000),(10,4,1,0.00020000),(11,4,2,0.00044092),(12,4,3,0.00705479);
/*!40000 ALTER TABLE `sysweightunit_rate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tempuploadfile`
--

DROP TABLE IF EXISTS `tempuploadfile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tempuploadfile` (
  `TempUploadFile_Id` int(11) NOT NULL,
  `Object` varchar(50) DEFAULT NULL,
  `BizType` int(11) DEFAULT NULL,
  `FileUrl` varchar(255) DEFAULT NULL,
  `SysUser_Id` int(11) DEFAULT NULL,
  PRIMARY KEY (`TempUploadFile_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tempuploadfile`
--

LOCK TABLES `tempuploadfile` WRITE;
/*!40000 ALTER TABLE `tempuploadfile` DISABLE KEYS */;
/*!40000 ALTER TABLE `tempuploadfile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tempuploadpic`
--

DROP TABLE IF EXISTS `tempuploadpic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tempuploadpic` (
  `TempUploadPic_Id` int(11) NOT NULL,
  `Product_Id` int(11) DEFAULT NULL,
  `Seq` int(11) DEFAULT NULL,
  `PicUrl` varchar(255) DEFAULT NULL,
  `BrowsePicUrl` varchar(255) DEFAULT NULL,
  `SourcePicUrl` varchar(255) DEFAULT NULL,
  `IsMain` int(11) DEFAULT NULL,
  `RelPValueIds` varchar(255) DEFAULT NULL,
  `User_Id` int(11) DEFAULT NULL,
  `FileServiceSpace_Id` int(11) DEFAULT NULL,
  `SalePlatform_Id` int(11) DEFAULT NULL,
  `SaleSite_Id` int(11) DEFAULT NULL,
  PRIMARY KEY (`TempUploadPic_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tempuploadpic`
--

LOCK TABLES `tempuploadpic` WRITE;
/*!40000 ALTER TABLE `tempuploadpic` DISABLE KEYS */;
/*!40000 ALTER TABLE `tempuploadpic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translatekeyword`
--

DROP TABLE IF EXISTS `translatekeyword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `translatekeyword` (
  `TranslateKeyword_Id` int(11) NOT NULL,
  `CN_Value` varchar(255) DEFAULT NULL,
  `EN_Value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`TranslateKeyword_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translatekeyword`
--

LOCK TABLES `translatekeyword` WRITE;
/*!40000 ALTER TABLE `translatekeyword` DISABLE KEYS */;
/*!40000 ALTER TABLE `translatekeyword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warehouse`
--

DROP TABLE IF EXISTS `warehouse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `warehouse` (
  `Warehouse_Id` int(11) NOT NULL,
  `ParentWarehouse_Id` int(11) DEFAULT NULL,
  `Seq` int(11) DEFAULT NULL,
  `Layer` int(11) DEFAULT NULL,
  `WHIndexs` varchar(255) DEFAULT NULL,
  `GlobalArea_Id` int(11) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`Warehouse_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse`
--

LOCK TABLES `warehouse` WRITE;
/*!40000 ALTER TABLE `warehouse` DISABLE KEYS */;
INSERT INTO `warehouse` VALUES (1,0,1,0,'',14,1);
/*!40000 ALTER TABLE `warehouse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warehouse_res`
--

DROP TABLE IF EXISTS `warehouse_res`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `warehouse_res` (
  `Warehouse_Res_Id` int(11) NOT NULL,
  `Warehouse_Id` int(11) DEFAULT NULL,
  `WarehouseName` varchar(50) DEFAULT NULL,
  `LRCode` varchar(10) DEFAULT NULL,
  `WHAddress` varchar(255) DEFAULT NULL,
  `EnableFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`Warehouse_Res_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse_res`
--

LOCK TABLES `warehouse_res` WRITE;
/*!40000 ALTER TABLE `warehouse_res` DISABLE KEYS */;
INSERT INTO `warehouse_res` VALUES (1,1,'中国站','zh-cn','',1),(2,1,'中国站','en-us','',1);
/*!40000 ALTER TABLE `warehouse_res` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'lungu'
--

--
-- Final view structure for view `accountinrecord_report_v`
--

/*!50001 DROP VIEW IF EXISTS `accountinrecord_report_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `accountinrecord_report_v` AS select `t`.`AccountInRecord_Id` AS `AccountInRecord_Id`,`t`.`AIRCode` AS `AIRCode`,`t`.`AIRType` AS `AIRType`,`t`.`SalePlatform_Id` AS `SalePlatform_Id`,`t`.`SaleSite_Id` AS `SaleSite_Id`,`t`.`SysCurrency_Id` AS `SysCurrency_Id`,`t`.`Receive` AS `Receive`,`t`.`ReceivedIn` AS `ReceivedIn`,`t`.`State` AS `State`,`t`.`Remark` AS `Remark`,`t`.`OperateTime` AS `OperateTime`,`t`.`OperateBy` AS `OperateBy`,`t`.`AccountYear` AS `AccountYear`,`t`.`AccountMonth` AS `AccountMonth`,`t`.`LastUpdatedTime` AS `LastUpdatedTime`,`t`.`LastUpdatedBy` AS `LastUpdatedBy`,`t`.`RvObject` AS `RvObject`,`t`.`BizContent` AS `BizContent`,`t`.`SaleOrder_Id` AS `SaleOrder_Id`,`t`.`SaleOrderCode` AS `SaleOrderCode`,`t`.`FromSource` AS `FromSource`,`t`.`SIKey` AS `SIKey`,`t`.`Customer_Id` AS `Customer_Id`,`t`.`Supplier_Id` AS `Supplier_Id`,`t`.`PurchaseOrder_Id` AS `PurchaseOrder_Id`,`t`.`AS_Problem_Id` AS `AS_Problem_Id`,`t`.`SOCode` AS `SOCode`,`t`.`ASPCode` AS `ASPCode`,`t`.`CustName` AS `CustName`,`t`.`POCode` AS `POCode`,`t`.`SuppName` AS `SuppName` from `accountinrecord` `t` where (`t`.`AIRType` <> 10) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `accountinrecord_v`
--

/*!50001 DROP VIEW IF EXISTS `accountinrecord_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `accountinrecord_v` AS select `t`.`AccountInRecord_Id` AS `AccountInRecord_Id`,`t`.`AIRCode` AS `AIRCode`,`t`.`AIRType` AS `AIRType`,`t`.`SalePlatform_Id` AS `SalePlatform_Id`,`t`.`SaleSite_Id` AS `SaleSite_Id`,`t`.`SysCurrency_Id` AS `SysCurrency_Id`,`t`.`Receive` AS `Receive`,`t`.`ReceivedIn` AS `ReceivedIn`,`t`.`State` AS `State`,`t`.`Remark` AS `Remark`,`t`.`OperateTime` AS `OperateTime`,`t`.`OperateBy` AS `OperateBy`,`t`.`AccountYear` AS `AccountYear`,`t`.`AccountMonth` AS `AccountMonth`,`t`.`LastUpdatedTime` AS `LastUpdatedTime`,`t`.`LastUpdatedBy` AS `LastUpdatedBy`,`t`.`RvObject` AS `RvObject`,`t`.`BizContent` AS `BizContent`,`t`.`SaleOrder_Id` AS `SaleOrder_Id`,`t`.`SaleOrderCode` AS `SaleOrderCode`,`t`.`FromSource` AS `FromSource`,`t`.`SIKey` AS `SIKey`,`t`.`Customer_Id` AS `Customer_Id`,`t`.`Supplier_Id` AS `Supplier_Id`,`t`.`PurchaseOrder_Id` AS `PurchaseOrder_Id`,`t`.`AS_Problem_Id` AS `AS_Problem_Id`,`t`.`SOCode` AS `SOCode`,`t`.`ASPCode` AS `ASPCode`,`t`.`CustName` AS `CustName`,`t`.`POCode` AS `POCode`,`t`.`SuppName` AS `SuppName`,(select sum(`w`.`PRFund`) from `previewfundflowrecord` `w` where (`w`.`AccountInRecord_Id` = `t`.`AccountInRecord_Id`)) AS `FreezePRFund` from `accountinrecord` `t` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `accountoutrecord_report_v`
--

/*!50001 DROP VIEW IF EXISTS `accountoutrecord_report_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `accountoutrecord_report_v` AS select `t`.`AccountOutRecord_Id` AS `AccountOutRecord_Id`,`t`.`AORCode` AS `AORCode`,`t`.`SalePlatform_Id` AS `SalePlatform_Id`,`t`.`SaleSite_Id` AS `SaleSite_Id`,`t`.`CostSubject_Id` AS `CostSubject_Id`,`t`.`SysCurrency_Id` AS `SysCurrency_Id`,`t`.`Payout` AS `Payout`,`t`.`Paidout` AS `Paidout`,`t`.`State` AS `State`,`t`.`Remark` AS `Remark`,`t`.`OperateTime` AS `OperateTime`,`t`.`OperateBy` AS `OperateBy`,`t`.`AccountYear` AS `AccountYear`,`t`.`AccountMonth` AS `AccountMonth`,`t`.`LastUpdatedTime` AS `LastUpdatedTime`,`t`.`LastUpdatedBy` AS `LastUpdatedBy`,`t`.`PayObject` AS `PayObject`,`t`.`BizContent` AS `BizContent`,`t`.`SaleOrder_Id` AS `SaleOrder_Id`,`t`.`AS_Problem_Id` AS `AS_Problem_Id`,`t`.`Customer_Id` AS `Customer_Id`,`t`.`Supplier_Id` AS `Supplier_Id`,`t`.`PurchaseOrder_Id` AS `PurchaseOrder_Id`,`t`.`ExpressOrder_Id` AS `ExpressOrder_Id`,`t`.`FromSource` AS `FromSource`,`t`.`SIKey` AS `SIKey`,`t`.`SOCode` AS `SOCode`,`t`.`CustName` AS `CustName`,`t`.`EOCode` AS `EOCode`,`t`.`LstSolutionName` AS `LstSolutionName`,`t`.`TrackingNumber` AS `TrackingNumber`,`t`.`OutEOCode` AS `OutEOCode`,`t`.`ASPCode` AS `ASPCode`,`t`.`POCode` AS `POCode`,`t`.`SuppName` AS `SuppName` from (`accountoutrecord` `t` left join `costsubject_res` `a` on((`t`.`CostSubject_Id` = `a`.`CostSubject_Id`))) where ((`a`.`LRCode` = 'zh-cn') and (`a`.`CostSubjectName` <> '资金转出')) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `accountoutrecord_v`
--

/*!50001 DROP VIEW IF EXISTS `accountoutrecord_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `accountoutrecord_v` AS select `t`.`AccountOutRecord_Id` AS `AccountOutRecord_Id`,`t`.`AORCode` AS `AORCode`,`t`.`SalePlatform_Id` AS `SalePlatform_Id`,`t`.`SaleSite_Id` AS `SaleSite_Id`,`t`.`CostSubject_Id` AS `CostSubject_Id`,`t`.`SysCurrency_Id` AS `SysCurrency_Id`,`t`.`Payout` AS `Payout`,`t`.`Paidout` AS `Paidout`,`t`.`State` AS `State`,`t`.`Remark` AS `Remark`,`t`.`OperateTime` AS `OperateTime`,`t`.`OperateBy` AS `OperateBy`,`t`.`AccountYear` AS `AccountYear`,`t`.`AccountMonth` AS `AccountMonth`,`t`.`LastUpdatedTime` AS `LastUpdatedTime`,`t`.`LastUpdatedBy` AS `LastUpdatedBy`,`t`.`PayObject` AS `PayObject`,`t`.`BizContent` AS `BizContent`,`t`.`SaleOrder_Id` AS `SaleOrder_Id`,`t`.`AS_Problem_Id` AS `AS_Problem_Id`,`t`.`Customer_Id` AS `Customer_Id`,`t`.`Supplier_Id` AS `Supplier_Id`,`t`.`PurchaseOrder_Id` AS `PurchaseOrder_Id`,`t`.`ExpressOrder_Id` AS `ExpressOrder_Id`,`t`.`FromSource` AS `FromSource`,`t`.`SIKey` AS `SIKey`,`t`.`SOCode` AS `SOCode`,`t`.`CustName` AS `CustName`,`t`.`EOCode` AS `EOCode`,`t`.`LstSolutionName` AS `LstSolutionName`,`t`.`TrackingNumber` AS `TrackingNumber`,`t`.`OutEOCode` AS `OutEOCode`,`t`.`ASPCode` AS `ASPCode`,`t`.`POCode` AS `POCode`,`t`.`SuppName` AS `SuppName`,`a`.`SPfName` AS `SPfName`,`b`.`SaleSiteName` AS `SaleSiteName`,`c`.`CostSubjectName` AS `CostSubjectName`,`d`.`CurrSymbol` AS `CurrSymbol`,`f`.`CurrName` AS `CurrName`,`c`.`LRCode` AS `LRCode` from (((((`accountoutrecord` `t` join `costsubject_res` `c` on((`t`.`CostSubject_Id` = `c`.`CostSubject_Id`))) left join `syscurrency` `d` on((`t`.`SysCurrency_Id` = `d`.`SysCurrency_Id`))) left join `syscurrency_res` `f` on(((`t`.`SysCurrency_Id` = `f`.`SysCurrency_Id`) and (`f`.`LRCode` = `c`.`LRCode`)))) left join `saleplatform` `a` on((`t`.`SalePlatform_Id` = `a`.`SalePlatform_Id`))) left join `salesite` `b` on((`t`.`SaleSite_Id` = `b`.`SaleSite_Id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `as_problem_v`
--

/*!50001 DROP VIEW IF EXISTS `as_problem_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `as_problem_v` AS select `t`.`AS_Problem_Id` AS `AS_Problem_Id`,`t`.`Customer_Id` AS `Customer_Id`,`t`.`SalePlatform_Id` AS `SalePlatform_Id`,`t`.`SaleSite_Id` AS `SaleSite_Id`,`t`.`ASPCode` AS `ASPCode`,`t`.`SaleOrder_Id` AS `SaleOrder_Id`,`t`.`SOCode` AS `SOCode`,`t`.`ProblemType` AS `ProblemType`,`t`.`CustReturn` AS `CustReturn`,`t`.`ProblemRemark` AS `ProblemRemark`,`t`.`HandleType` AS `HandleType`,`t`.`HandleRemark` AS `HandleRemark`,`t`.`Refund` AS `Refund`,`t`.`SysCurrency_Id` AS `SysCurrency_Id`,`t`.`State` AS `State`,`t`.`IsResend` AS `IsResend`,`t`.`CreateTime` AS `CreateTime`,`t`.`Creator` AS `Creator`,`t`.`LastUpdatedTime` AS `LastUpdatedTime`,`t`.`LastUpdatedBy` AS `LastUpdatedBy`,`t`.`SubmitHandleTime` AS `SubmitHandleTime`,`t`.`SubmitHandler` AS `SubmitHandler`,`t`.`ExpressOrder_Id` AS `ExpressOrder_Id`,`t`.`CustReturnTrack` AS `CustReturnTrack`,`t`.`ReceiveRetTime` AS `ReceiveRetTime`,`t`.`ReceiveRetBy` AS `ReceiveRetBy`,`t`.`ReceiveRetFlag` AS `ReceiveRetFlag`,`t`.`ASPMonth` AS `ASPMonth`,`t`.`ASPYear` AS `ASPYear`,`a`.`Email` AS `Email`,`b`.`CustName` AS `CustName`,`a`.`RvAddressCount` AS `RvAddressCount`,`c`.`RvFullName` AS `RvFullName`,`c`.`IsTrack` AS `IsTrack`,`c`.`ExpServiceCost` AS `ExpServiceCost`,`c`.`GlobalArea_Id` AS `GlobalArea_Id`,`b`.`LRCode` AS `LRCode`,if(isnull(`f`.`EstimatedShipTime`),`c`.`EstimatedShipTime`,`f`.`EstimatedShipTime`) AS `EstimatedShipTime`,if(isnull(`f`.`EstimatedArriveTime`),`c`.`EstimatedArriveTime`,`f`.`EstimatedArriveTime`) AS `EstimatedArriveTime`,`f`.`ShipTime` AS `ShipTime`,`f`.`ArriveTime` AS `ArriveTime`,`f`.`TrackingNumber` AS `TrackingNumber`,`f`.`EOState` AS `EOState`,`f`.`LstSolution_Id` AS `LstSolution_Id`,if(isnull(`f`.`LstSolutionName`),`c`.`LstSolutionName`,`f`.`LstSolutionName`) AS `LstSolutionName`,`f`.`IsCombin` AS `IsCombin`,`g`.`ExpressOrder_Id` AS `SO_ExpressOrder_Id` from (((((`as_problem` `t` join `customer` `a` on((`t`.`Customer_Id` = `a`.`Customer_Id`))) left join `customer_res` `b` on((`a`.`Customer_Id` = `b`.`Customer_Id`))) left join `as_problem_expservice` `c` on((`t`.`AS_Problem_Id` = `c`.`AS_Problem_Id`))) left join `expressorder` `f` on((`t`.`ExpressOrder_Id` = `f`.`ExpressOrder_Id`))) left join `saleorder` `g` on((`t`.`SaleOrder_Id` = `g`.`SaleOrder_Id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `asp_finance_v`
--

/*!50001 DROP VIEW IF EXISTS `asp_finance_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `asp_finance_v` AS (select `t`.`AS_Problem_Id` AS `AS_Problem_Id`,1 AS `BillType`,(sum(`t`.`ReceivedIn`) + sum(if(isnull(`a`.`PRFund`),0,`a`.`PRFund`))) AS `Done`,(sum(`t`.`Receive`) - (sum(`t`.`ReceivedIn`) + sum(if(isnull(`a`.`PRFund`),0,`a`.`PRFund`)))) AS `Remaining`,`a`.`PRFund` AS `PRFund` from (`accountinrecord` `t` left join `previewfundflowrecord` `a` on((`t`.`AccountInRecord_Id` = `a`.`AccountInRecord_Id`))) where (`t`.`AS_Problem_Id` > 0) group by `t`.`AS_Problem_Id`) union (select `t`.`AS_Problem_Id` AS `AS_Problem_Id`,2 AS `BillType`,sum(`t`.`Paidout`) AS `sum(t.Paidout)`,(sum(`t`.`Payout`) - sum(`t`.`Paidout`)) AS `Remaining`,0 AS `0` from `accountoutrecord` `t` where (`t`.`AS_Problem_Id` > 0) group by `t`.`AS_Problem_Id`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `asp_product_v`
--

/*!50001 DROP VIEW IF EXISTS `asp_product_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `asp_product_v` AS select `a`.`SaleOrder_Id` AS `SaleOrder_Id`,`t`.`SkuProduct_Id` AS `SkuProduct_Id`,sum(`t`.`Qty`) AS `Qty`,sum(`t`.`ReceiveRetQty`) AS `ReceiveRetQty`,sum(if((`a`.`HandleType` = 1),`t`.`Qty`,0)) AS `RefundQty`,sum(if((`a`.`HandleType` = 2),`t`.`Qty`,0)) AS `ResendQty`,sum(if((`a`.`HandleType` = 0),`t`.`Qty`,0)) AS `OtherQty` from (`as_problem_prod` `t` join `as_problem` `a` on((`t`.`AS_Problem_Id` = `a`.`AS_Problem_Id`))) group by `a`.`SaleOrder_Id`,`t`.`SkuProduct_Id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `countrytax_v`
--

/*!50001 DROP VIEW IF EXISTS `countrytax_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `countrytax_v` AS select `b`.`CountryTax_Id` AS `CountryTax_Id`,`t`.`GlobalArea_Id` AS `GlobalArea_Id`,`a`.`GlobalAreaName` AS `GlobalAreaName`,`b`.`TaxLimit` AS `TaxLimit`,`c`.`Remark` AS `Remark`,`d`.`SysCurrency_Id` AS `SysCurrency_Id`,`d`.`CurrSymbol` AS `CurrSymbol`,`a`.`LRCode` AS `LRCode`,`t`.`IsImportant` AS `IsImportant` from ((((`globalarea` `t` left join `globalarea_res` `a` on((`t`.`GlobalArea_Id` = `a`.`GlobalArea_Id`))) left join `countrytax` `b` on((`t`.`GlobalArea_Id` = `b`.`GlobalArea_Id`))) left join `countrytax_res` `c` on(((`b`.`CountryTax_Id` = `c`.`CountryTax_Id`) and (`a`.`LRCode` = `c`.`LRCode`)))) left join `syscurrency` `d` on((`b`.`SysCurrency_Id` = `d`.`SysCurrency_Id`))) where (`t`.`Layer` = 1) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `customer_v`
--

/*!50001 DROP VIEW IF EXISTS `customer_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `customer_v` AS select `t`.`Customer_Id` AS `Customer_Id`,`t`.`Seq` AS `Seq`,`t`.`CustomerGroup_Id` AS `CustomerGroup_Id`,`t`.`Email` AS `Email`,`t`.`Tel` AS `Tel`,`t`.`ContactInfo` AS `ContactInfo`,`t`.`Pwd` AS `Pwd`,`t`.`CreateTime` AS `CreateTime`,`t`.`UpdatedTime` AS `UpdatedTime`,`t`.`User_Id` AS `User_Id`,`t`.`GlobalArea_Id` AS `GlobalArea_Id`,`t`.`UpdatedBy` AS `UpdatedBy`,`t`.`CreatedBy` AS `CreatedBy`,`t`.`SalePlatform_Id` AS `SalePlatform_Id`,`t`.`RvAddressCount` AS `RvAddressCount`,`t`.`CustKey` AS `CustKey`,`t`.`EnableFlag` AS `EnableFlag`,`t`.`ScriptVersion` AS `ScriptVersion`,`a`.`CustName` AS `CustName`,`a`.`Remark` AS `Remark`,`a`.`LRCode` AS `LRCode`,`t`.`state` AS `state`,`t`.`bizlic_url` AS `bizlic_url`,`t`.`store_url` AS `store_url` from (`customer` `t` join `customer_res` `a` on((`t`.`Customer_Id` = `a`.`Customer_Id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `expressorder_v`
--

/*!50001 DROP VIEW IF EXISTS `expressorder_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `expressorder_v` AS select `t`.`ExpressOrder_Id` AS `ExpressOrder_Id`,`t`.`EOCode` AS `EOCode`,`t`.`Weight` AS `Weight`,`t`.`Length` AS `Length`,`t`.`Width` AS `Width`,`t`.`Height` AS `Height`,`t`.`IsTrack` AS `IsTrack`,`t`.`EstimatedShipTime` AS `EstimatedShipTime`,`t`.`EstimatedArriveTime` AS `EstimatedArriveTime`,`t`.`ShipTime` AS `ShipTime`,`t`.`ArriveTime` AS `ArriveTime`,`t`.`LstSolution_Id` AS `LstSolution_Id`,`t`.`LstCompanyName` AS `LstCompanyName`,`t`.`LstSolutionName` AS `LstSolutionName`,`t`.`ExpServiceCost` AS `ExpServiceCost`,`t`.`Customer_Id` AS `Customer_Id`,`t`.`RvFullName` AS `RvFullName`,`t`.`RvTel` AS `RvTel`,`t`.`GlobalArea_Id` AS `GlobalArea_Id`,`t`.`RvProvince` AS `RvProvince`,`t`.`RvCity` AS `RvCity`,`t`.`RvPostCode` AS `RvPostCode`,`t`.`RvAddress_1` AS `RvAddress_1`,`t`.`RvAddress_2` AS `RvAddress_2`,`t`.`ActualWeight` AS `ActualWeight`,`t`.`ActualLength` AS `ActualLength`,`t`.`ActualWidth` AS `ActualWidth`,`t`.`ActualHeight` AS `ActualHeight`,`t`.`ActualCost` AS `ActualCost`,`t`.`TrackingNumber` AS `TrackingNumber`,`t`.`OutEOCode` AS `OutEOCode`,`t`.`EOState` AS `EOState`,`t`.`ProductJson` AS `ProductJson`,`t`.`Warehouse_Id` AS `Warehouse_Id`,`t`.`IsCombin` AS `IsCombin`,`t`.`IsReceiveRet` AS `IsReceiveRet`,`t`.`ReceiveTime` AS `ReceiveTime`,`t`.`ReceiveBy` AS `ReceiveBy`,`t`.`Product_Id` AS `Product_Id`,`t`.`SMTError` AS `SMTError`,`t`.`CustName` AS `CustName`,`t`.`SMTPdfFile` AS `SMTPdfFile`,`c`.`AreaIndexs` AS `AreaIndexs`,`d`.`WHIndexs` AS `WHIndexs` from ((`expressorder` `t` join `globalarea` `c`) join `warehouse` `d`) where ((`t`.`GlobalArea_Id` = `c`.`GlobalArea_Id`) and (`t`.`Warehouse_Id` = `d`.`Warehouse_Id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `financereport_time_v`
--

/*!50001 DROP VIEW IF EXISTS `financereport_time_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `financereport_time_v` AS (select `accountinrecord`.`AccountYear` AS `Year`,`accountinrecord`.`AccountMonth` AS `Month` from `accountinrecord`) union all (select `accountoutrecord`.`AccountYear` AS `Year`,`accountoutrecord`.`AccountMonth` AS `Month` from `accountoutrecord`) union all (select `fundtransferrecord`.`OutFundYear` AS `Year`,`fundtransferrecord`.`OutFundMonth` AS `Month` from `fundtransferrecord`) union all (select `fundtransferrecord`.`InFundYear` AS `Year`,`fundtransferrecord`.`InFundMonth` AS `Month` from `fundtransferrecord`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `fundflowrecord_v`
--

/*!50001 DROP VIEW IF EXISTS `fundflowrecord_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `fundflowrecord_v` AS select `t`.`FundFlowRecord_Id` AS `FundFlowRecord_Id`,`t`.`AccountOutRecord_Id` AS `AccountOutRecord_Id`,`t`.`AccountInRecord_Id` AS `AccountInRecord_Id`,`t`.`FFRCode` AS `FFRCode`,`t`.`FlowFund` AS `FlowFund`,`t`.`LosedFund` AS `LosedFund`,`t`.`FundAccount_Id` AS `FundAccount_Id`,`t`.`SysCurrency_Id` AS `SysCurrency_Id`,`t`.`Rate` AS `Rate`,`t`.`PRFund` AS `PRFund`,`t`.`OperateTime` AS `OperateTime`,`t`.`OperateBy` AS `OperateBy`,`t`.`AccountYear` AS `AccountYear`,`t`.`AccountMonth` AS `AccountMonth`,`t`.`FromSource` AS `FromSource`,`t`.`SIKey` AS `SIKey`,`a`.`FundAccount` AS `FundAccount`,`b`.`CurrSymbol` AS `CurrSymbol`,if(isnull(`c`.`AORCode`),`h`.`AIRCode`,`c`.`AORCode`) AS `ObjCode`,`d`.`FullName` AS `FullName`,if(isnull(`e`.`CurrSymbol`),`i`.`CurrSymbol`,`e`.`CurrSymbol`) AS `AORCurrSymbol`,`f`.`CurrName` AS `CurrName`,if(isnull(`g`.`CurrName`),`j`.`CurrName`,`g`.`CurrName`) AS `AORCurrName`,`f`.`LRCode` AS `FundLRCode`,if(isnull(`g`.`LRCode`),`j`.`LRCode`,`g`.`LRCode`) AS `OjbLRCode`,`c`.`SaleOrder_Id` AS `AO_SaleOrder_Id`,`h`.`SaleOrder_Id` AS `AI_SaleOrder_Id`,`c`.`AS_Problem_Id` AS `AO_AS_Problem_Id`,`h`.`AS_Problem_Id` AS `AI_AS_Problem_Id`,`c`.`PurchaseOrder_Id` AS `AO_PurchaseOrder_Id`,`h`.`PurchaseOrder_Id` AS `AI_PurchaseOrder_Id` from ((((((((((`fundflowrecord` `t` left join `fundaccount` `a` on((`t`.`FundAccount_Id` = `a`.`FundAccount_Id`))) left join `syscurrency` `b` on((`t`.`SysCurrency_Id` = `b`.`SysCurrency_Id`))) left join `accountoutrecord` `c` on((`t`.`AccountOutRecord_Id` = `c`.`AccountOutRecord_Id`))) left join `sysuser` `d` on((`t`.`OperateBy` = `d`.`SysUser_Id`))) left join `syscurrency` `e` on((`c`.`SysCurrency_Id` = `e`.`SysCurrency_Id`))) left join `syscurrency_res` `f` on((`b`.`SysCurrency_Id` = `f`.`SysCurrency_Id`))) left join `syscurrency_res` `g` on((`e`.`SysCurrency_Id` = `g`.`SysCurrency_Id`))) left join `accountinrecord` `h` on((`t`.`AccountInRecord_Id` = `h`.`AccountInRecord_Id`))) left join `syscurrency` `i` on((`h`.`SysCurrency_Id` = `i`.`SysCurrency_Id`))) left join `syscurrency_res` `j` on((`i`.`SysCurrency_Id` = `j`.`SysCurrency_Id`))) where ((`f`.`LRCode` = `g`.`LRCode`) or (`f`.`LRCode` = `j`.`LRCode`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `fundtransferrecord_v`
--

/*!50001 DROP VIEW IF EXISTS `fundtransferrecord_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `fundtransferrecord_v` AS select `t`.`FundTransferRecord_Id` AS `FundTransferRecord_Id`,`t`.`FTRCode` AS `FTRCode`,`t`.`OutFundAccount_Id` AS `OutFundAccount_Id`,`t`.`OutSysCurrency_Id` AS `OutSysCurrency_Id`,`t`.`OutFund` AS `OutFund`,`t`.`InFundAccount_Id` AS `InFundAccount_Id`,`t`.`InSysCurrency_Id` AS `InSysCurrency_Id`,`t`.`InFund` AS `InFund`,`t`.`LosedFund` AS `LosedFund`,`t`.`Rate` AS `Rate`,`t`.`OperateBy` AS `OperateBy`,`t`.`OperateTime` AS `OperateTime`,`t`.`OutFundTime` AS `OutFundTime`,`t`.`OutFundYear` AS `OutFundYear`,`t`.`OutFundMonth` AS `OutFundMonth`,`t`.`InFundTime` AS `InFundTime`,`t`.`InFundYear` AS `InFundYear`,`t`.`InFundMonth` AS `InFundMonth`,`a`.`FundAccount` AS `OutFundAccount`,`c`.`CurrSymbol` AS `OutCurrSymbol`,`f`.`CurrName` AS `OutCurrName`,`b`.`FundAccount` AS `InFundAccount`,`d`.`CurrSymbol` AS `InCurrSymbol`,`g`.`CurrName` AS `InCurrName`,`e`.`FullName` AS `FullName`,`f`.`LRCode` AS `LRCode` from (((((((`fundtransferrecord` `t` join `fundaccount` `a` on((`t`.`OutFundAccount_Id` = `a`.`FundAccount_Id`))) join `fundaccount` `b` on((`t`.`InFundAccount_Id` = `b`.`FundAccount_Id`))) left join `syscurrency` `c` on((`t`.`OutSysCurrency_Id` = `c`.`SysCurrency_Id`))) left join `syscurrency` `d` on((`t`.`InSysCurrency_Id` = `d`.`SysCurrency_Id`))) left join `sysuser` `e` on((`t`.`OperateBy` = `e`.`SysUser_Id`))) left join `syscurrency_res` `f` on((`t`.`OutSysCurrency_Id` = `f`.`SysCurrency_Id`))) left join `syscurrency_res` `g` on(((`t`.`InSysCurrency_Id` = `g`.`SysCurrency_Id`) and (`g`.`LRCode` = `f`.`LRCode`)))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `inoutstock_v`
--

/*!50001 DROP VIEW IF EXISTS `inoutstock_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `inoutstock_v` AS select `t`.`InOutStock_Id` AS `InOutStock_Id`,`t`.`From_Warehouse_Id` AS `From_Warehouse_Id`,`t`.`To_Warehouse_Id` AS `To_Warehouse_Id`,`t`.`Action` AS `Action`,`t`.`StockInType` AS `StockInType`,`t`.`Remark` AS `Remark`,`t`.`OperatedBy` AS `OperatedBy`,`t`.`OperatedTime` AS `OperatedTime`,`t`.`AS_Problem_Id` AS `AS_Problem_Id`,`t`.`ASPCode` AS `ASPCode`,`t`.`PurchaseOrder_Id` AS `PurchaseOrder_Id`,`t`.`POCode` AS `POCode`,`t1`.`InOutStock_Item_Id` AS `InOutStock_Item_Id`,`t1`.`Qty` AS `Qty`,`c`.`Product_Id` AS `Product_Id`,`e`.`ProdName` AS `ProdName`,`c`.`SkuProduct_Id` AS `SkuProduct_Id`,`e`.`Unit` AS `Unit`,`c`.`ProdCode` AS `SkuProdCode`,`c`.`PropValues` AS `PropValues`,`c`.`PV_Txt` AS `PV_Txt`,`c`.`Product_Pic_Id` AS `Product_Pic_Id`,`c`.`Seq` AS `SkuSeq`,`f`.`FullName` AS `FullName`,`e`.`LRCode` AS `LRCode` from ((((`inoutstock` `t` join `inoutstock_item` `t1` on((`t`.`InOutStock_Id` = `t1`.`InOutStock_Id`))) join `skuproduct` `c` on((`t1`.`SkuProduct_Id` = `c`.`SkuProduct_Id`))) join `product_res` `e` on((`t1`.`Product_Id` = `e`.`Product_Id`))) left join `sysuser` `f` on((`t`.`OperatedBy` = `f`.`SysUser_Id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `inventory_v`
--

/*!50001 DROP VIEW IF EXISTS `inventory_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `inventory_v` AS select `t`.`Inventory_Id` AS `Inventory_Id`,`t`.`Product_Id` AS `Product_id`,`t`.`SkuProduct_Id` AS `SkuProduct_Id`,`g`.`BrowsePicUrl` AS `BrowsePicUrl`,`t`.`Qty` AS `Qty`,`a`.`Cost` AS `Cost`,`a`.`InventoryCost` AS `InventoryCost`,`t`.`Warehouse_Id` AS `Warehouse_Id`,`e`.`ProdName` AS `ProdName`,`e`.`Unit` AS `Unit`,`a`.`ProdCode` AS `SkuProdCode`,`a`.`PV_Txt` AS `PV_Txt`,group_concat(conv(conv(`d`.`ProdCategory_Id`,10,8),8,10) order by `d`.`Seq` ASC separator ',') AS `ProdCategory_Ids`,group_concat(`d`.`PdcIndexs`,',#',conv(conv(`d`.`ProdCategory_Id`,10,8),8,10),'#' separator ',') AS `PdcIndexs`,`e`.`LRCode` AS `LRCode` from (((((((`inventory` `t` join `skuproduct` `a` on((`t`.`SkuProduct_Id` = `a`.`SkuProduct_Id`))) join `product` `b` on((`t`.`Product_Id` = `b`.`Product_Id`))) join `product_seq` `c` on((`b`.`Product_Id` = `c`.`Product_Id`))) join `prodcategory` `d` on((`c`.`ProdCategory_Id` = `d`.`ProdCategory_Id`))) join `product_res` `e` on((`b`.`Product_Id` = `e`.`Product_Id`))) join `warehouse` `f` on((`t`.`Warehouse_Id` = `f`.`Warehouse_Id`))) left join `product_pic` `g` on((`a`.`Product_Pic_Id` = `g`.`Product_Pic_Id`))) group by `t`.`Warehouse_Id`,`t`.`SkuProduct_Id`,`e`.`LRCode` order by `f`.`Seq`,min(((`d`.`Seq` * 10000) + `c`.`Seq`)),`a`.`Seq` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `lstsolution_v`
--

/*!50001 DROP VIEW IF EXISTS `lstsolution_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `lstsolution_v` AS select `t`.`LstSolution_Id` AS `LstSolution_Id`,`t`.`Seq` AS `Seq`,`t`.`LstCompany_Id` AS `LstCompany_Id`,`t`.`SysWeightUnit_Id` AS `SysWeightUnit_Id`,`t`.`SysCurrency_Id` AS `SysCurrency_Id`,`t`.`CalculateModel` AS `CalculateModel`,`t`.`LstSolutionType` AS `LstSolutionType`,`t`.`TrackWebAddress` AS `TrackWebAddress`,`t`.`VolumnForCal` AS `VolumnForCal`,`t`.`VATLimit` AS `VATLimit`,`t`.`VATValue` AS `VATValue`,`t`.`VAT_SysCurrency_Id` AS `VAT_SysCurrency_Id`,`t`.`SalePlatform_Ids` AS `SalePlatform_Ids`,`t`.`Warehouse_Ids` AS `Warehouse_Ids`,`t`.`EnableFlag` AS `EnableFlag`,`a`.`LstSolutionName` AS `LstSolutionName`,`b`.`LstCompanyName` AS `LstCompanyName`,`c`.`Seq` AS `LstCompanySeq`,`a`.`LRCode` AS `LRCode` from (((`lstsolution` `t` left join `lstsolution_res` `a` on((`t`.`LstSolution_Id` = `a`.`LstSolution_Id`))) left join `lstcompany` `c` on((`t`.`LstCompany_Id` = `c`.`LstCompany_Id`))) left join `lstcompany_res` `b` on(((`t`.`LstCompany_Id` = `b`.`LstCompany_Id`) and (`b`.`LRCode` = `a`.`LRCode`)))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `lstsolutionrel_v`
--

/*!50001 DROP VIEW IF EXISTS `lstsolutionrel_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `lstsolutionrel_v` AS select `t`.`LstSolution_Id` AS `LstSolution_Id`,`t`.`Seq` AS `Seq`,`t`.`LstCompany_Id` AS `LstCompany_Id`,`t`.`SysWeightUnit_Id` AS `SysWeightUnit_Id`,`t`.`SysCurrency_Id` AS `SysCurrency_Id`,`t`.`CalculateModel` AS `CalculateModel`,`t`.`LstSolutionType` AS `LstSolutionType`,`t`.`TrackWebAddress` AS `TrackWebAddress`,`t`.`VolumnForCal` AS `VolumnForCal`,`t`.`VATLimit` AS `VATLimit`,`t`.`VATValue` AS `VATValue`,`t`.`VAT_SysCurrency_Id` AS `VAT_SysCurrency_Id`,`t`.`SalePlatform_Ids` AS `SalePlatform_Ids`,`t`.`Warehouse_Ids` AS `Warehouse_Ids`,`t`.`EnableFlag` AS `EnableFlag`,`b`.`LstSolutionItem_Id` AS `LstSolutionItem_Id`,`b`.`LstAreaIds` AS `LstAreaIds`,`b`.`MinAvaiTime` AS `MinAvaiTime`,`b`.`MaxAvaiTime` AS `MaxAvaiTime`,`b`.`StartWeight` AS `StartWeight`,`b`.`WeightLimit` AS `WeightLimit`,`c`.`GlobalArea_Id` AS `GlobalArea_Id` from (((`lstsolution` `t` join `lstsolutionitem` `b` on((`t`.`LstSolution_Id` = `b`.`LstSolution_Id`))) join `lstsolution_area_rel` `c` on((`b`.`LstSolutionItem_Id` = `c`.`LstSolutionItem_Id`))) join `globalarea` `d` on((`c`.`GlobalArea_Id` = `d`.`GlobalArea_Id`))) where (`t`.`EnableFlag` = 1) order by `d`.`Layer` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `po_finance_v`
--

/*!50001 DROP VIEW IF EXISTS `po_finance_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `po_finance_v` AS (select `t`.`PurchaseOrder_Id` AS `PurchaseOrder_Id`,1 AS `BillType`,(sum(`t`.`ReceivedIn`) + sum(if(isnull(`a`.`PRFund`),0,`a`.`PRFund`))) AS `Done`,(sum(`t`.`Receive`) - (sum(`t`.`ReceivedIn`) + sum(if(isnull(`a`.`PRFund`),0,`a`.`PRFund`)))) AS `Remaining`,`a`.`PRFund` AS `PRFund` from (`accountinrecord` `t` left join `previewfundflowrecord` `a` on((`t`.`AccountInRecord_Id` = `a`.`AccountInRecord_Id`))) where (`t`.`PurchaseOrder_Id` > 0) group by `t`.`PurchaseOrder_Id`) union (select `t`.`PurchaseOrder_Id` AS `PurchaseOrder_Id`,2 AS `BillType`,sum(`t`.`Paidout`) AS `sum(t.Paidout)`,(sum(`t`.`Payout`) - sum(`t`.`Paidout`)) AS `Remaining`,0 AS `0` from `accountoutrecord` `t` where (`t`.`PurchaseOrder_Id` > 0) group by `t`.`PurchaseOrder_Id`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `po_financerecord_v`
--

/*!50001 DROP VIEW IF EXISTS `po_financerecord_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `po_financerecord_v` AS (select 1 AS `FBType`,`t`.`AIRType` AS `FType`,`t`.`AccountInRecord_Id` AS `FRId`,`t`.`AIRCode` AS `FCode`,`t`.`OperateTime` AS `OperateTime`,`t`.`Receive` AS `FTotalMoney`,`t`.`ReceivedIn` AS `FFinishedMoney`,`t`.`FreezePRFund` AS `FreezePRFund`,`t`.`State` AS `State`,`t`.`PurchaseOrder_Id` AS `PurchaseOrder_Id`,`t`.`SysCurrency_Id` AS `SysCurrency_Id`,'' AS `CostSubjectName`,'' AS `LRCode` from `accountinrecord_v` `t`) union (select 2 AS `FBType`,`t`.`CostSubject_Id` AS `FType`,`t`.`AccountOutRecord_Id` AS `FRId`,`t`.`AORCode` AS `FCode`,`t`.`OperateTime` AS `OperateTime`,`t`.`Payout` AS `FTotalMoney`,`t`.`Paidout` AS `FFinishedMoney`,NULL AS `NULL`,`t`.`State` AS `State`,`t`.`PurchaseOrder_Id` AS `PurchaseOrder_Id`,`t`.`SysCurrency_Id` AS `SysCurrency_Id`,`b`.`CostSubjectName` AS `CostSubjectName`,`b`.`LRCode` AS `LRCode` from (`accountoutrecord` `t` left join `costsubject_res` `b` on((`t`.`CostSubject_Id` = `b`.`CostSubject_Id`)))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `po_product_running_v`
--

/*!50001 DROP VIEW IF EXISTS `po_product_running_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `po_product_running_v` AS select `a`.`SkuProduct_Id` AS `SkuProduct_Id`,(sum(if(`a`.`Qty`,`a`.`Qty`,0)) - sum(if(`a`.`ReceiveRetQty`,`a`.`ReceiveRetQty`,0))) AS `Qty` from (`purchaseorder` `t` left join `po_product` `a` on((`t`.`PurchaseOrder_Id` = `a`.`PurchaseOrder_Id`))) where (`t`.`State` = 10) group by `a`.`SkuProduct_Id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `pr_eoproduct_v`
--

/*!50001 DROP VIEW IF EXISTS `pr_eoproduct_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `pr_eoproduct_v` AS select `a`.`Product_Id` AS `Product_Id`,`a`.`SkuProduct_Id` AS `SkuProduct_Id`,sum(if(`a`.`Qty`,`a`.`Qty`,0)) AS `Qty`,min(`t`.`EstimatedShipTime`) AS `MinEstimatedShipTime` from (`expressorder` `t` left join `eo_product` `a` on((`t`.`ExpressOrder_Id` = `a`.`ExpressOrder_Id`))) where (`t`.`EOState` = 0) group by `a`.`SkuProduct_Id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `previewfundflowrecord_v`
--

/*!50001 DROP VIEW IF EXISTS `previewfundflowrecord_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `previewfundflowrecord_v` AS select `t`.`PreviewFundFlowRecord_Id` AS `PreviewFundFlowRecord_Id`,`t`.`AccountOutRecord_Id` AS `AccountOutRecord_Id`,`t`.`AccountInRecord_Id` AS `AccountInRecord_Id`,`t`.`FFRCode` AS `FFRCode`,`t`.`FlowFund` AS `FlowFund`,`t`.`LosedFund` AS `LosedFund`,`t`.`FundAccount_Id` AS `FundAccount_Id`,`t`.`SysCurrency_Id` AS `SysCurrency_Id`,`t`.`Rate` AS `Rate`,`t`.`PRFund` AS `PRFund`,`t`.`OperateTime` AS `OperateTime`,`t`.`OperateBy` AS `OperateBy`,`t`.`AccountYear` AS `AccountYear`,`t`.`AccountMonth` AS `AccountMonth`,`t`.`FromSource` AS `FromSource`,`t`.`SIKey` AS `SIKey`,`a`.`FundAccount` AS `FundAccount`,`b`.`CurrSymbol` AS `CurrSymbol`,if(isnull(`c`.`AORCode`),`h`.`AIRCode`,`c`.`AORCode`) AS `ObjCode`,`d`.`FullName` AS `FullName`,if(isnull(`e`.`CurrSymbol`),`i`.`CurrSymbol`,`e`.`CurrSymbol`) AS `AORCurrSymbol`,`f`.`CurrName` AS `CurrName`,if(isnull(`g`.`CurrName`),`j`.`CurrName`,`g`.`CurrName`) AS `AORCurrName`,`f`.`LRCode` AS `FundLRCode`,if(isnull(`g`.`LRCode`),`j`.`LRCode`,`g`.`LRCode`) AS `OjbLRCode` from ((((((((((`previewfundflowrecord` `t` left join `fundaccount` `a` on((`t`.`FundAccount_Id` = `a`.`FundAccount_Id`))) left join `syscurrency` `b` on((`t`.`SysCurrency_Id` = `b`.`SysCurrency_Id`))) left join `accountoutrecord` `c` on((`t`.`AccountOutRecord_Id` = `c`.`AccountOutRecord_Id`))) left join `sysuser` `d` on((`t`.`OperateBy` = `d`.`SysUser_Id`))) left join `syscurrency` `e` on((`c`.`SysCurrency_Id` = `e`.`SysCurrency_Id`))) left join `syscurrency_res` `f` on((`b`.`SysCurrency_Id` = `f`.`SysCurrency_Id`))) left join `syscurrency_res` `g` on((`e`.`SysCurrency_Id` = `g`.`SysCurrency_Id`))) left join `accountinrecord` `h` on((`t`.`AccountInRecord_Id` = `h`.`AccountInRecord_Id`))) left join `syscurrency` `i` on((`h`.`SysCurrency_Id` = `i`.`SysCurrency_Id`))) left join `syscurrency_res` `j` on((`i`.`SysCurrency_Id` = `j`.`SysCurrency_Id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `prodinventory_v`
--

/*!50001 DROP VIEW IF EXISTS `prodinventory_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `prodinventory_v` AS select `t`.`Product_Id` AS `Product_Id`,`a`.`ProdCode` AS `ProdCode`,`a`.`Brand_Id` AS `Brand_Id`,`a`.`PropValues` AS `PropValues`,`b`.`ProdName` AS `ProdName`,`b`.`Unit` AS `Unit`,min(`d`.`Seq`) AS `PdcSeq`,`a`.`Seq` AS `Seq`,sum(`t`.`Qty`) AS `Qty` from (((`inventory` `t` join `product` `a` on((`t`.`Product_Id` = `a`.`Product_Id`))) join `product_res` `b` on((`a`.`Product_Id` = `b`.`Product_Id`))) join `prodcategory` `d` on((`a`.`ProdCategory_Id` = `d`.`ProdCategory_Id`))) group by `a`.`Product_Id`,`t`.`Warehouse_Id`,`b`.`LRCode` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `product_pdc_v`
--

/*!50001 DROP VIEW IF EXISTS `product_pdc_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `product_pdc_v` AS select cast(concat(`t`.`Product_Id`,'-',`b`.`ProdCategory_Id`) as char charset utf8) AS `ProdKey`,`t`.`Product_Id` AS `Product_Id`,`t`.`Brand_Id` AS `Brand_Id`,`t`.`Weight` AS `Weight`,`t`.`SKUProps` AS `SKUProps`,`t`.`ExpandProps` AS `ExpandProps`,`t`.`ProdProperty_Ids` AS `ProdProperty_Ids`,`t`.`PropValues` AS `PropValues`,`t`.`ProdCode` AS `ProdCode`,`t`.`SkuProdCount` AS `SkuProdCount`,`t`.`MinCost` AS `MinCost`,`t`.`MaxCost` AS `MaxCost`,`t`.`State` AS `State`,`t`.`Length` AS `Length`,`t`.`Width` AS `Width`,`t`.`Height` AS `Height`,`t`.`PicFile` AS `PicFile`,`t`.`CustomProdName` AS `CustomProdName`,`t`.`CustomProdName_CN` AS `CustomProdName_CN`,`t`.`CustomMaterial` AS `CustomMaterial`,`t`.`CustomValue` AS `CustomValue`,`t`.`CustomCode` AS `CustomCode`,`t`.`GlobalArea_Id` AS `GlobalArea_Id`,`a`.`ProdName` AS `ProdName`,`a`.`Unit` AS `Unit`,`a`.`LRCode` AS `LRCode`,`b`.`Product_Seq_Id` AS `Product_Seq_Id`,`b`.`Seq` AS `Seq`,`c`.`ProdCategory_Id` AS `ProdCategory_Id`,`c`.`PdcIndexs` AS `PdcIndexs`,`t`.`EnableFlag` AS `EnableFlag` from (((`product` `t` join `product_res` `a` on((`t`.`Product_Id` = `a`.`Product_Id`))) join `product_seq` `b` on((`t`.`Product_Id` = `b`.`Product_Id`))) join `prodcategory` `c` on((`b`.`ProdCategory_Id` = `c`.`ProdCategory_Id`))) order by `c`.`Seq`,`b`.`Seq` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `product_rel_v`
--

/*!50001 DROP VIEW IF EXISTS `product_rel_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `product_rel_v` AS (select `b`.`Product_Id` AS `Product_Id`,if((max(`c`.`State`) > 1),2,1) AS `State` from (((`ss_innerprod` `t` join `ss_innerprod_sku_rel` `a` on((`t`.`SS_InnerProd_Id` = `a`.`SS_InnerProd_Id`))) join `skuproduct` `b` on((`a`.`SkuProduct_Id` = `b`.`SkuProduct_Id`))) join `ss_product` `c` on((`t`.`SS_Product_Id` = `c`.`SS_Product_Id`))) where (`a`.`EnableFlag` = 1) group by `b`.`Product_Id`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `product_v`
--

/*!50001 DROP VIEW IF EXISTS `product_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `product_v` AS select `t`.`Product_Id` AS `Product_Id`,`t`.`Brand_Id` AS `Brand_Id`,`t`.`Weight` AS `Weight`,`t`.`SKUProps` AS `SKUProps`,`t`.`ExpandProps` AS `ExpandProps`,`t`.`ProdProperty_Ids` AS `ProdProperty_Ids`,`t`.`PropValues` AS `PropValues`,`t`.`ProdCode` AS `ProdCode`,`t`.`SkuProdCount` AS `SkuProdCount`,`t`.`MinCost` AS `MinCost`,`t`.`MaxCost` AS `MaxCost`,`t`.`State` AS `State`,`t`.`Length` AS `Length`,`t`.`Width` AS `Width`,`t`.`Height` AS `Height`,`t`.`PicFile` AS `PicFile`,`t`.`CustomProdName` AS `CustomProdName`,`t`.`CustomProdName_CN` AS `CustomProdName_CN`,`t`.`CustomMaterial` AS `CustomMaterial`,`t`.`CustomValue` AS `CustomValue`,`t`.`CustomCode` AS `CustomCode`,`t`.`GlobalArea_Id` AS `GlobalArea_Id`,`t`.`Operator` AS `Operator`,`a`.`ProdName` AS `ProdName`,`a`.`Unit` AS `Unit`,`a`.`LRCode` AS `LRCode`,group_concat(conv(conv(`c`.`ProdCategory_Id`,10,8),8,10) order by `c`.`Seq` ASC separator ',') AS `ProdCategory_Id`,group_concat(`c`.`PdcIndexs`,',#',conv(conv(`c`.`ProdCategory_Id`,10,8),8,10),'#' separator ',') AS `PdcIndexs`,`t`.`EnableFlag` AS `EnableFlag` from (((`product` `t` join `product_res` `a` on((`t`.`Product_Id` = `a`.`Product_Id`))) left join `product_seq` `b` on((`t`.`Product_Id` = `b`.`Product_Id`))) join `prodcategory` `c` on((`b`.`ProdCategory_Id` = `c`.`ProdCategory_Id`))) group by `t`.`Product_Id`,`a`.`LRCode` order by min(((`c`.`Seq` * 10000) + `b`.`Seq`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `purchaseorder_v`
--

/*!50001 DROP VIEW IF EXISTS `purchaseorder_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `purchaseorder_v` AS select `t`.`PurchaseOrder_Id` AS `PurchaseOrder_Id`,`t`.`POCode` AS `POCode`,`t`.`Supplier_Id` AS `Supplier_Id`,`t`.`Warehouse_Id` AS `Warehouse_Id`,`t`.`OtherCharge` AS `OtherCharge`,`t`.`TotalPrice` AS `TotalPrice`,`t`.`CreateTime` AS `CreateTime`,`t`.`CreateBy` AS `CreateBy`,`t`.`LastUpdatedTime` AS `LastUpdatedTime`,`t`.`LastUpdatedUser` AS `LastUpdatedUser`,`t`.`EstimateArriveTime` AS `EstimateArriveTime`,`t`.`Remark` AS `Remark`,`t`.`RevType` AS `RevType`,`t`.`RevRemark` AS `RevRemark`,`t`.`State` AS `State`,`b`.`SuppName` AS `SuppName`,`b`.`LRCode` AS `LRCode`,`c`.`FullName` AS `FullName` from (((`purchaseorder` `t` left join `supplier` `a` on((`t`.`Supplier_Id` = `a`.`Supplier_Id`))) left join `supplier_res` `b` on((`t`.`Supplier_Id` = `b`.`Supplier_Id`))) left join `sysuser` `c` on((`t`.`CreateBy` = `c`.`SysUser_Id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `purchaseproduct_v`
--

/*!50001 DROP VIEW IF EXISTS `purchaseproduct_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `purchaseproduct_v` AS select `t`.`SkuProduct_Id` AS `SkuProduct_Id`,`t`.`Product_Id` AS `Product_Id`,`t`.`ProdCode` AS `SkuProdCode`,`e`.`ProdName` AS `ProdName`,`e`.`Unit` AS `Unit`,`t`.`PV_Txt` AS `PV_Txt`,`t`.`Cost` AS `Cost`,`c`.`LastUpdatedTime` AS `LastUpdatedTime`,`d`.`BrowsePicUrl` AS `BrowsePicUrl`,sum(if(`c`.`Qty`,`c`.`Qty`,0)) AS `RequestQty`,sum(if(`h`.`Qty`,`h`.`Qty`,0)) AS `RunningQty`,if(((sum(if(`h`.`Qty`,`h`.`Qty`,0)) - sum(if(`c`.`Qty`,`c`.`Qty`,0))) >= 0),0,1) AS `IsRequest`,`e`.`LRCode` AS `LRCode`,`f`.`Seq` AS `Seq`,`t`.`Seq` AS `SkuSeq`,`g`.`Seq` AS `PdcSeq`,`g`.`PdcIndexs` AS `PdcIndexs`,`g`.`ProdCategory_Id` AS `ProdCategory_Id` from ((((((`skuproduct` `t` left join `purchaseproduct` `c` on((`t`.`SkuProduct_Id` = `c`.`SkuProduct_Id`))) left join `product_pic` `d` on((`t`.`Product_Pic_Id` = `d`.`Product_Pic_Id`))) left join `product_res` `e` on((`t`.`Product_Id` = `e`.`Product_Id`))) left join `product` `f` on((`t`.`Product_Id` = `f`.`Product_Id`))) left join `prodcategory` `g` on((`f`.`ProdCategory_Id` = `g`.`ProdCategory_Id`))) left join `po_product_running_v` `h` on((`t`.`SkuProduct_Id` = `h`.`SkuProduct_Id`))) where (`c`.`Qty` > 0) group by `t`.`SkuProduct_Id`,`e`.`LRCode` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `sale_finance_v`
--

/*!50001 DROP VIEW IF EXISTS `sale_finance_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `sale_finance_v` AS (select 1 AS `FBType`,`t`.`AIRType` AS `FType`,`t`.`AccountInRecord_Id` AS `FRId`,`t`.`AIRCode` AS `FCode`,`t`.`OperateTime` AS `OperateTime`,`t`.`Receive` AS `FTotalMoney`,`t`.`ReceivedIn` AS `FFinishedMoney`,(select sum(`w`.`PRFund`) from `previewfundflowrecord` `w` where (`w`.`AccountInRecord_Id` = `t`.`AccountInRecord_Id`)) AS `FreezePRFund`,`t`.`State` AS `State`,`t`.`SaleOrder_Id` AS `SaleOrder_Id`,`t`.`SysCurrency_Id` AS `SysCurrency_Id`,`t`.`AS_Problem_Id` AS `AS_Problem_Id`,`a`.`ASPCode` AS `ASPCode`,`a`.`ProblemType` AS `ProblemType`,NULL AS `CostSubjectName`,NULL AS `LRCode` from (`accountinrecord` `t` left join `as_problem` `a` on((`t`.`AS_Problem_Id` = `a`.`AS_Problem_Id`)))) union (select 2 AS `FBType`,`t`.`CostSubject_Id` AS `FType`,`t`.`AccountOutRecord_Id` AS `FRId`,`t`.`AORCode` AS `FCode`,`t`.`OperateTime` AS `OperateTime`,`t`.`Payout` AS `FTotalMoney`,`t`.`Paidout` AS `FFinishedMoney`,NULL AS `NULL`,`t`.`State` AS `State`,`t`.`SaleOrder_Id` AS `SaleOrder_Id`,`t`.`SysCurrency_Id` AS `SysCurrency_Id`,`a`.`AS_Problem_Id` AS `AS_Problem_Id`,`a`.`ASPCode` AS `ASPCode`,`a`.`ProblemType` AS `ProblemType`,`b`.`CostSubjectName` AS `CostSubjectName`,`b`.`LRCode` AS `LRCode` from ((`accountoutrecord` `t` left join `as_problem` `a` on((`t`.`AS_Problem_Id` = `a`.`AS_Problem_Id`))) left join `costsubject_res` `b` on((`t`.`CostSubject_Id` = `b`.`CostSubject_Id`)))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `saleanalysisobj_v`
--

/*!50001 DROP VIEW IF EXISTS `saleanalysisobj_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `saleanalysisobj_v` AS select `t`.`SaleAnalysisObj_Id` AS `SaleAnalysisObj_Id`,`t`.`SAOName` AS `SAOName`,`t`.`SAOType` AS `SAOType`,`t`.`TargetProfit` AS `TargetProfit`,`t`.`TargetAvageSaleQty` AS `TargetAvageSaleQty`,`t`.`TargetAvageProfit` AS `TargetAvageProfit`,`t`.`MonitorEndTime` AS `MonitorEndTime`,`t`.`SalePlatform_Id` AS `SalePlatform_Id`,`t`.`SaleSite_Id` AS `SaleSite_Id`,`t`.`Remark` AS `Remark`,`t`.`Priority` AS `Priority`,min(`a`.`SS_Product_Id`) AS `SS_Product_Id`,min(`b`.`BrowsePicUrl`) AS `BrowsePicUrl`,count(`a`.`SS_Product_Id`) AS `ProdCount` from ((`saleanalysisobj` `t` left join `sao_product` `a` on((`t`.`SaleAnalysisObj_Id` = `a`.`SaleAnalysisObj_Id`))) left join `product_pic` `b` on(((`a`.`SS_Product_Id` = `b`.`SS_Product_Id`) and (`b`.`IsMain` = 1)))) group by `t`.`SaleAnalysisObj_Id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `saleorder_finance_v`
--

/*!50001 DROP VIEW IF EXISTS `saleorder_finance_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `saleorder_finance_v` AS (select `t`.`SaleOrder_Id` AS `SaleOrder_Id`,1 AS `BillType`,(sum(`t`.`Receive`) - (sum(`t`.`ReceivedIn`) + sum(if(isnull(`a`.`PRFund`),0,`a`.`PRFund`)))) AS `Remaining`,`a`.`PRFund` AS `PRFund` from (`accountinrecord` `t` left join `previewfundflowrecord` `a` on((`t`.`AccountInRecord_Id` = `a`.`AccountInRecord_Id`))) where (`t`.`SaleOrder_Id` > 0) group by `t`.`SaleOrder_Id`) union (select `t`.`SaleOrder_Id` AS `SaleOrder_Id`,2 AS `BillType`,(sum(`t`.`Payout`) - sum(`t`.`Paidout`)) AS `Remaining`,0 AS `0` from `accountoutrecord` `t` where (`t`.`SaleOrder_Id` > 0) group by `t`.`SaleOrder_Id`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `saleorder_v`
--

/*!50001 DROP VIEW IF EXISTS `saleorder_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `saleorder_v` AS select `t`.`SaleOrder_Id` AS `SaleOrder_Id`,`t`.`SOCode` AS `SOCode`,`t`.`Customer_Id` AS `Customer_Id`,`t`.`CustName` AS `CustName`,`t`.`SalePlatform_Id` AS `SalePlatform_Id`,`t`.`SaleSite_Id` AS `SaleSite_Id`,`t`.`SysWeightUnit_Id` AS `SysWeightUnit_Id`,`t`.`SysCurrency_Id` AS `SysCurrency_Id`,`t`.`CurrRate` AS `CurrRate`,`t`.`TotalPrice` AS `TotalPrice`,`t`.`TotalCost` AS `TotalCost`,`t`.`TotalProfit` AS `TotalProfit`,`t`.`SOState` AS `SOState`,`t`.`CreateTime` AS `CreateTime`,`t`.`Creator` AS `Creator`,`t`.`CustConfirmTime` AS `CustConfirmTime`,`t`.`CustConfirmer` AS `CustConfirmer`,`t`.`SubmitHandleTime` AS `SubmitHandleTime`,`t`.`SubmitHandler` AS `SubmitHandler`,`t`.`SubmitExpTime` AS `SubmitExpTime`,`t`.`SubmitExper` AS `SubmitExper`,`t`.`LastUpdatedDate` AS `LastUpdatedDate`,`t`.`LastUpdatedUser` AS `LastUpdatedUser`,`t`.`ProductJson` AS `ProductJson`,`t`.`IsReSend` AS `IsReSend`,`t`.`DeliveryInSMT` AS `DeliveryInSMT`,`t`.`DeliveryInTaobao` AS `DeliveryInTaobao`,`t`.`SMTState` AS `SMTState`,`c`.`RvFullName` AS `RvFullName`,`c`.`ExpressService_Id` AS `ExpressService_Id`,`c`.`ExpressServiceName` AS `ExpressServiceName`,`c`.`IsTrack` AS `IsTrack`,`c`.`ExpServicePrice` AS `ExpServicePrice`,`c`.`GlobalArea_Id` AS `GlobalArea_Id`,`c`.`EstimatedArriveTime` AS `SOEstimatedArriveTime`,`f`.`EOCode` AS `EOCode`,if(isnull(`f`.`EstimatedShipTime`),`c`.`EstimatedShipTime`,`f`.`EstimatedShipTime`) AS `EstimatedShipTime`,if(isnull(`f`.`EstimatedArriveTime`),`c`.`EstimatedArriveTime`,`f`.`EstimatedArriveTime`) AS `EstimatedArriveTime`,if(isnull(`f`.`Warehouse_Id`),`c`.`Warehouse_Id`,`f`.`Warehouse_Id`) AS `Warehouse_Id`,if(isnull(`f`.`LstSolution_Id`),`c`.`LstSolution_Id`,`f`.`LstSolution_Id`) AS `LstSolution_Id`,if(isnull(`f`.`LstSolutionName`),`c`.`LstSolutionName`,`f`.`LstSolutionName`) AS `LstSolutionName`,`f`.`ShipTime` AS `ShipTime`,`f`.`ArriveTime` AS `ArriveTime`,`f`.`TrackingNumber` AS `TrackingNumber`,`f`.`EOState` AS `EOState`,`f`.`ExpressOrder_Id` AS `ExpressOrder_Id`,`f`.`IsCombin` AS `IsCombin`,`t`.`Remark` AS `SORemark`,`t`.`pic_snapshot` AS `pic_snapshot` from ((`saleorder` `t` left join `so_expservice` `c` on((`t`.`SaleOrder_Id` = `c`.`SaleOrder_Id`))) left join `expressorder` `f` on((`t`.`ExpressOrder_Id` = `f`.`ExpressOrder_Id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `saleorderwitheo_v`
--

/*!50001 DROP VIEW IF EXISTS `saleorderwitheo_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `saleorderwitheo_v` AS select `t`.`SaleOrder_Id` AS `SaleOrder_Id`,`t`.`SOCode` AS `SOCode`,`t`.`Customer_Id` AS `Customer_Id`,`t`.`CustName` AS `CustName`,`t`.`SalePlatform_Id` AS `SalePlatform_Id`,`t`.`SaleSite_Id` AS `SaleSite_Id`,`t`.`SysWeightUnit_Id` AS `SysWeightUnit_Id`,`t`.`SysCurrency_Id` AS `SysCurrency_Id`,`t`.`TotalPrice` AS `TotalPrice`,`t`.`TotalCost` AS `TotalCost`,`t`.`TotalProfit` AS `TotalProfit`,`t`.`SOState` AS `SOState`,`t`.`CreateTime` AS `CreateTime`,`t`.`Creator` AS `Creator`,`t`.`CustConfirmTime` AS `CustConfirmTime`,`t`.`CustConfirmer` AS `CustConfirmer`,`t`.`SubmitHandleTime` AS `SubmitHandleTime`,`t`.`SubmitHandler` AS `SubmitHandler`,`t`.`SubmitExpTime` AS `SubmitExpTime`,`t`.`SubmitExper` AS `SubmitExper`,`t`.`LastUpdatedDate` AS `LastUpdatedDate`,`t`.`LastUpdatedUser` AS `LastUpdatedUser`,`t`.`ProductJson` AS `ProductJson`,`t`.`IsReSend` AS `IsReSend`,`t`.`SMTState` AS `SMTState`,`c`.`ExpressService_Id` AS `ExpressService_Id`,`c`.`ExpressServiceName` AS `ExpressServiceName`,`c`.`IsTrack` AS `IsTrack`,`c`.`ExpServicePrice` AS `ExpServicePrice`,if(isnull(`f`.`EstimatedShipTime`),`c`.`EstimatedShipTime`,`f`.`EstimatedShipTime`) AS `EstimatedShipTime`,if(isnull(`f`.`EstimatedArriveTime`),`c`.`EstimatedArriveTime`,`f`.`EstimatedArriveTime`) AS `EstimatedArriveTime`,`f`.`ShipTime` AS `ShipTime`,`f`.`ArriveTime` AS `ArriveTime`,`f`.`TrackingNumber` AS `TrackingNumber`,`f`.`EOState` AS `EOState`,`f`.`ExpressOrder_Id` AS `ExpressOrder_Id`,`f`.`LstSolution_Id` AS `LstSolution_Id`,`f`.`LstSolutionName` AS `LstSolutionName`,`f`.`IsCombin` AS `IsCombin`,`f`.`RvFullName` AS `RvFullName`,`f`.`RvTel` AS `RvTel`,`f`.`GlobalArea_Id` AS `GlobalArea_Id`,`f`.`RvProvince` AS `RvProvince`,`f`.`RvCity` AS `RvCity`,`f`.`RvPostCode` AS `RvPostCode`,`f`.`RvAddress_1` AS `RvAddress_1`,`f`.`RvAddress_2` AS `RvAddress_2` from ((`saleorder` `t` left join `so_expservice` `c` on((`t`.`SaleOrder_Id` = `c`.`SaleOrder_Id`))) left join `expressorder` `f` on((`t`.`ExpressOrder_Id` = `f`.`ExpressOrder_Id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `sao_prodexpservicecoststat_v`
--

/*!50001 DROP VIEW IF EXISTS `sao_prodexpservicecoststat_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `sao_prodexpservicecoststat_v` AS select `t`.`SaleOrder_Id` AS `SaleOrder_Id`,`a`.`GlobalArea_Id` AS `GlobalArea_Id`,`a`.`RvProvince` AS `RvProvince`,`a`.`RvCity` AS `RvCity`,`t1`.`SS_Product_Id` AS `SS_Product_Id`,(`a`.`ExpServicePrice` / sum(`t1`.`Qty`)) AS `ProdExpPrice`,(if(isnull(`b`.`ActualCost`),(`a`.`ExpServiceCost` * if(((sum(((`e`.`Weight` * `e`.`Qty`) + `t1`.`BoxWeight`)) / `a`.`Weight`) > 1),1,(sum(((`e`.`Weight` * `e`.`Qty`) + `t1`.`BoxWeight`)) / `a`.`Weight`))),((`b`.`ActualCost` * if(((sum(((`e`.`Weight` * `e`.`Qty`) + `t1`.`BoxWeight`)) / `a`.`Weight`) > 1),1,(sum(((`e`.`Weight` * `e`.`Qty`) + `t1`.`BoxWeight`)) / `a`.`Weight`))) * `d`.`Rate`)) / sum(`t1`.`Qty`)) AS `ProdExpCost`,if(((sum(((`e`.`Weight` * `e`.`Qty`) + `t1`.`BoxWeight`)) / `a`.`Weight`) > 1),1,(sum(((`e`.`Weight` * `e`.`Qty`) + `t1`.`BoxWeight`)) / `a`.`Weight`)) AS `WeightRate`,`t`.`CreateTime` AS `SaleTime`,`t`.`SaleSite_Id` AS `SaleSite_Id` from (((((`saleorder` `t` join `so_product` `t1` on((`t`.`SaleOrder_Id` = `t1`.`SaleOrder_Id`))) join `so_gproduct` `e` on((`t1`.`SO_Product_Id` = `e`.`SO_Product_Id`))) join `so_expservice` `a` on((`t`.`SaleOrder_Id` = `a`.`SaleOrder_Id`))) left join `expressorder` `b` on((`t`.`ExpressOrder_Id` = `b`.`ExpressOrder_Id`))) left join `syscurrrate` `d` on(((`d`.`SysCurrency_Id_A` = 1) and (`d`.`SysCurrency_Id_B` = `t`.`SysCurrency_Id`)))) where (`t`.`SOState` in (10,20,30)) group by `t`.`SaleOrder_Id`,`t1`.`SS_Product_Id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `sao_prodpriceandcoststat_v`
--

/*!50001 DROP VIEW IF EXISTS `sao_prodpriceandcoststat_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `sao_prodpriceandcoststat_v` AS select `t`.`SaleOrder_Id` AS `SaleOrder_Id`,`t`.`SysCurrency_Id` AS `SysCurrency_Id`,`e`.`GlobalArea_Id` AS `GlobalArea_Id`,`e`.`RvProvince` AS `RvProvince`,`e`.`RvCity` AS `RvCity`,`c`.`SS_Product_Id` AS `SS_Product_Id`,sum(`c`.`Qty`) AS `Qty`,(sum((`c`.`ListPrice` * `c`.`Qty`)) / sum(`c`.`Qty`)) AS `ListPrice`,(sum((`c`.`SalePrice` * `c`.`Qty`)) / sum(`c`.`Qty`)) AS `SalePrice`,(sum(((`c`.`TransCost` * `c`.`SalePrice`) * `c`.`Qty`)) / sum(`c`.`Qty`)) AS `TransCost`,(sum((`c`.`OtherCost` * `c`.`Qty`)) / sum(`c`.`Qty`)) AS `OtherCost`,(sum((if(isnull(`b`.`Cost`),`a`.`Cost`,(`b`.`Cost` * `d`.`Rate`)) * `a`.`Qty`)) / sum(`c`.`Qty`)) AS `ProdCost`,`t`.`CreateTime` AS `SaleTime`,`t`.`SaleSite_Id` AS `SaleSite_Id` from (((((`saleorder` `t` join `so_product` `c` on((`t`.`SaleOrder_Id` = `c`.`SaleOrder_Id`))) join `so_gproduct` `a` on((`c`.`SO_Product_Id` = `a`.`SO_Product_Id`))) join `so_expservice` `e` on((`t`.`SaleOrder_Id` = `e`.`SaleOrder_Id`))) left join `eo_product` `b` on(((`t`.`ExpressOrder_Id` = `b`.`ExpressOrder_Id`) and (`a`.`SkuProduct_Id` = `b`.`SkuProduct_Id`)))) left join `syscurrrate` `d` on(((`d`.`SysCurrency_Id_A` = 1) and (`d`.`SysCurrency_Id_B` = `t`.`SysCurrency_Id`)))) where (`t`.`SOState` in (10,20,30)) group by `t`.`SaleOrder_Id`,`c`.`SS_Product_Id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `sao_prodsalestat_v`
--

/*!50001 DROP VIEW IF EXISTS `sao_prodsalestat_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `sao_prodsalestat_v` AS select `t`.`SaleAnalysisObj_Id` AS `SaleAnalysisObj_Id`,`t`.`SAOName` AS `SAOName`,`t`.`SAOType` AS `SAOType`,`t`.`TargetProfit` AS `TargetProfit`,`t`.`TargetAvageSaleQty` AS `TargetAvageSaleQty`,`t`.`TargetAvageProfit` AS `TargetAvageProfit`,`t`.`MonitorEndTime` AS `MonitorEndTime`,`t`.`SalePlatform_Id` AS `SalePlatform_Id`,`t`.`SaleSite_Id` AS `SaleSite_Id`,`t`.`Remark` AS `Remark`,`t`.`Priority` AS `Priority`,`t`.`SS_Product_Id` AS `SS_Product_Id`,`t`.`BrowsePicUrl` AS `BrowsePicUrl`,`t`.`ProdCount` AS `ProdCount`,group_concat(distinct conv(conv(`a`.`SS_Product_Id`,10,8),8,10) separator ',') AS `SS_Product_Ids`,min(`b`.`OnlineTime`) AS `OnlineTIme` from ((`saleanalysisobj_v` `t` join `sao_product` `a` on((`t`.`SaleAnalysisObj_Id` = `a`.`SaleAnalysisObj_Id`))) join `ss_product` `b` on((`t`.`SS_Product_Id` = `b`.`SS_Product_Id`))) group by `t`.`SaleAnalysisObj_Id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `sao_skuprodexpservicecoststat_v`
--

/*!50001 DROP VIEW IF EXISTS `sao_skuprodexpservicecoststat_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `sao_skuprodexpservicecoststat_v` AS select `t`.`SaleOrder_Id` AS `SaleOrder_Id`,`a`.`GlobalArea_Id` AS `GlobalArea_Id`,`a`.`RvProvince` AS `RvProvince`,`a`.`RvCity` AS `RvCity`,`t1`.`SS_Product_Id` AS `SS_Product_Id`,`t1`.`SS_InnerProd_Id` AS `SS_InnerProd_Id`,(`a`.`ExpServicePrice` / sum(`t1`.`Qty`)) AS `ProdExpPrice`,(if(isnull(`b`.`ActualCost`),(`a`.`ExpServiceCost` * if(((sum(((`e`.`Weight` * `e`.`Qty`) + `t1`.`BoxWeight`)) / `a`.`Weight`) > 1),1,(sum(((`e`.`Weight` * `e`.`Qty`) + `t1`.`BoxWeight`)) / `a`.`Weight`))),((`b`.`ActualCost` * if(((sum(((`e`.`Weight` * `e`.`Qty`) + `t1`.`BoxWeight`)) / `a`.`Weight`) > 1),1,(sum(((`e`.`Weight` * `e`.`Qty`) + `t1`.`BoxWeight`)) / `a`.`Weight`))) * `d`.`Rate`)) / sum(`t1`.`Qty`)) AS `ProdExpCost`,if(((sum(((`e`.`Weight` * `e`.`Qty`) + `t1`.`BoxWeight`)) / `a`.`Weight`) > 1),1,(sum(((`e`.`Weight` * `e`.`Qty`) + `t1`.`BoxWeight`)) / `a`.`Weight`)) AS `WeightRate`,`t`.`CreateTime` AS `SaleTime`,`t`.`SaleSite_Id` AS `SaleSite_Id` from (((((`saleorder` `t` join `so_product` `t1` on((`t`.`SaleOrder_Id` = `t1`.`SaleOrder_Id`))) join `so_gproduct` `e` on((`t1`.`SO_Product_Id` = `e`.`SO_Product_Id`))) join `so_expservice` `a` on((`t`.`SaleOrder_Id` = `a`.`SaleOrder_Id`))) left join `expressorder` `b` on((`t`.`ExpressOrder_Id` = `b`.`ExpressOrder_Id`))) left join `syscurrrate` `d` on(((`d`.`SysCurrency_Id_A` = 1) and (`d`.`SysCurrency_Id_B` = `t`.`SysCurrency_Id`)))) where (`t`.`SOState` in (10,20,30)) group by `t`.`SaleOrder_Id`,`t1`.`SS_InnerProd_Id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `sao_skuprodpriceandcoststat_v`
--

/*!50001 DROP VIEW IF EXISTS `sao_skuprodpriceandcoststat_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `sao_skuprodpriceandcoststat_v` AS select `t`.`SaleOrder_Id` AS `SaleOrder_Id`,`e`.`GlobalArea_Id` AS `GlobalArea_Id`,`c`.`SS_Product_Id` AS `SS_Product_Id`,`c`.`SS_InnerProd_Id` AS `SS_InnerProd_Id`,sum(`c`.`Qty`) AS `Qty`,(sum((`c`.`ListPrice` * `c`.`Qty`)) / sum(`c`.`Qty`)) AS `ListPrice`,(sum((`c`.`SalePrice` * `c`.`Qty`)) / sum(`c`.`Qty`)) AS `SalePrice`,(sum(((`c`.`TransCost` * `c`.`SalePrice`) * `c`.`Qty`)) / sum(`c`.`Qty`)) AS `TransCost`,(sum((`c`.`OtherCost` * `c`.`Qty`)) / sum(`c`.`Qty`)) AS `OtherCost`,(sum((if(isnull(`b`.`Cost`),`a`.`Cost`,(`b`.`Cost` * `d`.`Rate`)) * `a`.`Qty`)) / sum(`c`.`Qty`)) AS `ProdCost`,`t`.`CreateTime` AS `SaleTime`,`t`.`SaleSite_Id` AS `SaleSite_Id` from (((((`saleorder` `t` join `so_product` `c` on((`t`.`SaleOrder_Id` = `c`.`SaleOrder_Id`))) join `so_gproduct` `a` on((`c`.`SO_Product_Id` = `a`.`SO_Product_Id`))) join `so_expservice` `e` on((`t`.`SaleOrder_Id` = `e`.`SaleOrder_Id`))) left join `eo_product` `b` on(((`t`.`ExpressOrder_Id` = `b`.`ExpressOrder_Id`) and (`a`.`SkuProduct_Id` = `b`.`SkuProduct_Id`)))) left join `syscurrrate` `d` on(((`d`.`SysCurrency_Id_A` = 1) and (`d`.`SysCurrency_Id_B` = `t`.`SysCurrency_Id`)))) where (`t`.`SOState` in (10,20,30)) group by `t`.`SaleOrder_Id`,`c`.`SS_InnerProd_Id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `skuquotedprice_v`
--

/*!50001 DROP VIEW IF EXISTS `skuquotedprice_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `skuquotedprice_v` AS select `t`.`PurchasePrice_Id` AS `PurchasePrice_Id`,`t`.`Product_Id` AS `Product_Id`,`t`.`SkuProduct_Id` AS `SkuProduct_Id`,`t`.`Supplier_Id` AS `Supplier_Id`,`t`.`PurAddress` AS `PurAddress`,`t`.`QuotedPrice` AS `QuotedPrice`,`t`.`Period` AS `Period`,`t`.`Remark` AS `Remark`,`t`.`GlobalArea_Id` AS `GlobalArea_Id`,`t`.`EnableFlag` AS `EnableFlag`,`a`.`PropValues` AS `PropValues`,`a`.`PV_Txt` AS `PV_Txt`,`e`.`SuppName` AS `SuppName`,`b`.`Seq` AS `Seq`,`a`.`Seq` AS `SkuSeq`,`d`.`Seq` AS `PdcSeq`,`c`.`ProdName` AS `ProdName`,`c`.`Unit` AS `Unit`,`a`.`ProdCode` AS `ProdCode`,`a`.`Cost` AS `Cost`,`a`.`Product_Pic_Id` AS `Product_Pic_Id`,`e`.`S_Address` AS `S_Address`,`c`.`LRCode` AS `LRCode` from ((((((`purchaseprice` `t` join `skuproduct` `a` on((`t`.`SkuProduct_Id` = `a`.`SkuProduct_Id`))) left join `product` `b` on((`a`.`Product_Id` = `b`.`Product_Id`))) left join `product_res` `c` on((`b`.`Product_Id` = `c`.`Product_Id`))) left join `prodcategory` `d` on((`b`.`ProdCategory_Id` = `d`.`ProdCategory_Id`))) left join `supplier` `f` on((`t`.`Supplier_Id` = `f`.`Supplier_Id`))) left join `supplier_res` `e` on(((`t`.`Supplier_Id` = `e`.`Supplier_Id`) and ((`e`.`LRCode` = `c`.`LRCode`) or isnull(`e`.`LRCode`))))) where (`t`.`EnableFlag` = 1) order by `f`.`Seq` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `so_innerprod_v`
--

/*!50001 DROP VIEW IF EXISTS `so_innerprod_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `so_innerprod_v` AS (select `t`.`SaleOrder_Id` AS `SaleOrder_Id`,`t`.`Product_Id` AS `Product_Id`,`t`.`SkuProduct_Id` AS `SkuProduct_Id`,`t`.`Qty` AS `Qty`,1 AS `Type`,`t`.`SkuProdCode` AS `SkuProdCode`,`t`.`ProdName` AS `ProdName`,`t`.`SkuProps` AS `SkuProps` from `so_gproduct` `t`) union (select `t`.`SaleOrder_Id` AS `SaleOrder_Id`,`t`.`Product_Id` AS `Product_Id`,`t`.`SkuProduct_Id` AS `SkuProduct_Id`,`t`.`Qty` AS `Qty`,2 AS `Type`,`t`.`SkuProdCode` AS `SkuProdCode`,`t`.`ProdName` AS `ProdName`,`t`.`SkuProps` AS `SkuProps` from `so_giftitem` `t`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `ss_product_full_v`
--

/*!50001 DROP VIEW IF EXISTS `ss_product_full_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `ss_product_full_v` AS select `t`.`SS_Product_Id` AS `SS_Product_Key`,`t`.`SS_Product_Id` AS `SS_Product_Id`,`t`.`Brand_Id` AS `Brand_Id`,`t`.`SKUProps` AS `SKUProps`,`t`.`ExpandProps` AS `ExpandProps`,`t`.`ProdProperty_Ids` AS `ProdProperty_Ids`,`t`.`PropValues` AS `PropValues`,`t`.`ProdCode` AS `ProdCode`,`t`.`GiftWeightLimit` AS `GiftWeightLimit`,`t`.`GiftCostLimit` AS `GiftCostLimit`,`t`.`AvailableUnitCount` AS `AvailableUnitCount`,`t`.`MinCost` AS `MinCost`,`t`.`MaxCost` AS `MaxCost`,`t`.`MinListPrice` AS `MinListPrice`,`t`.`MaxListPrice` AS `MaxListPrice`,`t`.`MinDiscount` AS `MinDiscount`,`t`.`MaxDiscount` AS `MaxDiscount`,`t`.`MinSalePrice` AS `MinSalePrice`,`t`.`MaxSalePrice` AS `MaxSalePrice`,`t`.`MinProfit` AS `MinProfit`,`t`.`MaxProfit` AS `MaxProfit`,`t`.`State` AS `State`,`t`.`PicFile` AS `PicFile`,`t`.`SalePlatform_Id` AS `SalePlatform_Id`,`t`.`SaleSite_Id` AS `SaleSite_Id`,`t`.`Tags` AS `Tags`,`a`.`LRCode` AS `LRCode`,`a`.`ProdName` AS `ProdName`,`a`.`Unit` AS `Unit`,`a`.`Remark` AS `Remark`,`b`.`Seq` AS `Seq`,min(((`c`.`Seq` * 10000) + `b`.`Seq`)) AS `ProdSeq`,`b`.`SS_Product_Seq_Id` AS `SS_Product_Seq_Id`,`t`.`SS_ProdCategory_Id` AS `SS_ProdCategory_Id`,group_concat(conv(conv(`c`.`ProdCategory_Id`,10,8),8,10) order by `c`.`Seq` ASC separator ',') AS `ProdCategory_Id`,group_concat(`c`.`PdcIndexs`,',#',conv(conv(`c`.`ProdCategory_Id`,10,8),8,10),'#' separator ',') AS `PdcIndexs`,`t`.`EnableFlag` AS `EnableFlag`,`t`.`OnlineTime` AS `OnlineTime`,`t`.`SMT_Product_Id` AS `SMT_Product_Id` from (((`ss_product` `t` join `ss_product_res` `a` on((`t`.`SS_Product_Id` = `a`.`SS_Product_Id`))) join `ss_product_seq` `b` on((`t`.`SS_Product_Id` = `b`.`SS_Product_Id`))) left join `salepdcnavigation` `c` on((`b`.`SS_ProdCategory_Id` = `c`.`ProdCategory_Id`))) group by `t`.`SS_Product_Id`,`a`.`LRCode` order by min(((`c`.`Seq` * 10000) + `b`.`Seq`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `ss_product_pdc_v`
--

/*!50001 DROP VIEW IF EXISTS `ss_product_pdc_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `ss_product_pdc_v` AS select `t`.`SS_Product_Id` AS `SS_Product_Key`,`t`.`SS_Product_Id` AS `SS_Product_Id`,`t`.`Brand_Id` AS `Brand_Id`,`t`.`SKUProps` AS `SKUProps`,`t`.`ExpandProps` AS `ExpandProps`,`t`.`ProdProperty_Ids` AS `ProdProperty_Ids`,`t`.`PropValues` AS `PropValues`,`t`.`ProdCode` AS `ProdCode`,`t`.`GiftWeightLimit` AS `GiftWeightLimit`,`t`.`GiftCostLimit` AS `GiftCostLimit`,`t`.`AvailableUnitCount` AS `AvailableUnitCount`,`t`.`MinCost` AS `MinCost`,`t`.`MaxCost` AS `MaxCost`,`t`.`MinListPrice` AS `MinListPrice`,`t`.`MaxListPrice` AS `MaxListPrice`,`t`.`MinDiscount` AS `MinDiscount`,`t`.`MaxDiscount` AS `MaxDiscount`,`t`.`MinSalePrice` AS `MinSalePrice`,`t`.`MaxSalePrice` AS `MaxSalePrice`,`t`.`MinProfit` AS `MinProfit`,`t`.`MaxProfit` AS `MaxProfit`,`t`.`State` AS `State`,`t`.`PicFile` AS `PicFile`,`t`.`SalePlatform_Id` AS `SalePlatform_Id`,`t`.`SaleSite_Id` AS `SaleSite_Id`,`a`.`LRCode` AS `LRCode`,`a`.`ProdName` AS `ProdName`,`a`.`Unit` AS `Unit`,`b`.`Seq` AS `Seq`,`b`.`SS_Product_Seq_Id` AS `SS_Product_Seq_Id`,`t`.`SS_ProdCategory_Id` AS `SS_ProdCategory_Id`,`c`.`ProdCategory_Id` AS `ProdCategory_Id`,`c`.`PdcIndexs` AS `PdcIndexs`,`t`.`EnableFlag` AS `EnableFlag`,`t`.`OnlineTime` AS `OnlineTime`,`t`.`SMT_Product_Id` AS `SMT_Product_Id` from (((`ss_product` `t` join `ss_product_res` `a` on((`t`.`SS_Product_Id` = `a`.`SS_Product_Id`))) join `ss_product_seq` `b` on((`t`.`SS_Product_Id` = `b`.`SS_Product_Id`))) left join `salepdcnavigation` `c` on((`b`.`SS_ProdCategory_Id` = `c`.`ProdCategory_Id`))) order by `c`.`Seq`,`b`.`Seq` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `ss_product_simple_v`
--

/*!50001 DROP VIEW IF EXISTS `ss_product_simple_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `ss_product_simple_v` AS select `t`.`SS_Product_Id` AS `SS_Product_Id`,`t`.`Brand_Id` AS `Brand_Id`,`t`.`SKUProps` AS `SKUProps`,`t`.`ExpandProps` AS `ExpandProps`,`t`.`ProdProperty_Ids` AS `ProdProperty_Ids`,`t`.`PropValues` AS `PropValues`,`t`.`ProdCode` AS `ProdCode`,`t`.`GiftWeightLimit` AS `GiftWeightLimit`,`t`.`GiftCostLimit` AS `GiftCostLimit`,`t`.`AvailableUnitCount` AS `AvailableUnitCount`,`t`.`MinCost` AS `MinCost`,`t`.`MaxCost` AS `MaxCost`,`t`.`MinListPrice` AS `MinListPrice`,`t`.`MaxListPrice` AS `MaxListPrice`,`t`.`MinDiscount` AS `MinDiscount`,`t`.`MaxDiscount` AS `MaxDiscount`,`t`.`MinSalePrice` AS `MinSalePrice`,`t`.`MaxSalePrice` AS `MaxSalePrice`,`t`.`MinProfit` AS `MinProfit`,`t`.`MaxProfit` AS `MaxProfit`,`t`.`State` AS `State`,`t`.`PicFile` AS `PicFile`,`t`.`SalePlatform_Id` AS `SalePlatform_Id`,`t`.`SaleSite_Id` AS `SaleSite_Id`,`t`.`SS_ProdCategory_Id` AS `SS_ProdCategory_Id`,`a`.`LRCode` AS `LRCode`,`a`.`ProdName` AS `ProdName`,`a`.`Unit` AS `Unit`,`t`.`EnableFlag` AS `EnableFlag`,`t`.`OnlineTime` AS `OnlineTime`,`t`.`SMT_Product_Id` AS `SMT_Product_Id` from ((`ss_product` `t` join `ss_product_res` `a` on((`t`.`SS_Product_Id` = `a`.`SS_Product_Id`))) join `salesite` `b` on((`t`.`SaleSite_Id` = `b`.`SaleSite_Id`))) where (`b`.`EnableFlag` = 1) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `ss_product_v`
--

/*!50001 DROP VIEW IF EXISTS `ss_product_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `ss_product_v` AS select `t`.`SS_Product_Id` AS `SS_Product_Key`,`t`.`SS_Product_Id` AS `SS_Product_Id`,`t`.`Brand_Id` AS `Brand_Id`,`t`.`SKUProps` AS `SKUProps`,`t`.`ExpandProps` AS `ExpandProps`,`t`.`ProdProperty_Ids` AS `ProdProperty_Ids`,`t`.`PropValues` AS `PropValues`,`t`.`ProdCode` AS `ProdCode`,`t`.`GiftWeightLimit` AS `GiftWeightLimit`,`t`.`GiftCostLimit` AS `GiftCostLimit`,`t`.`AvailableUnitCount` AS `AvailableUnitCount`,`t`.`MinCost` AS `MinCost`,`t`.`MaxCost` AS `MaxCost`,`t`.`MinListPrice` AS `MinListPrice`,`t`.`MaxListPrice` AS `MaxListPrice`,`t`.`MinDiscount` AS `MinDiscount`,`t`.`MaxDiscount` AS `MaxDiscount`,`t`.`MinSalePrice` AS `MinSalePrice`,`t`.`MaxSalePrice` AS `MaxSalePrice`,`t`.`MinProfit` AS `MinProfit`,`t`.`MaxProfit` AS `MaxProfit`,`t`.`State` AS `State`,`t`.`PicFile` AS `PicFile`,`t`.`SalePlatform_Id` AS `SalePlatform_Id`,`t`.`SaleSite_Id` AS `SaleSite_Id`,`t`.`Tags` AS `Tags`,`a`.`LRCode` AS `LRCode`,`a`.`ProdName` AS `ProdName`,`a`.`Unit` AS `Unit`,min(((`c`.`Seq` * 10000) + `b`.`Seq`)) AS `ProdSeq`,`b`.`Seq` AS `Seq`,`b`.`SS_Product_Seq_Id` AS `SS_Product_Seq_Id`,`t`.`SS_ProdCategory_Id` AS `SS_ProdCategory_Id`,group_concat(conv(conv(`c`.`ProdCategory_Id`,10,8),8,10) order by `c`.`Seq` ASC separator ',') AS `ProdCategory_Id`,group_concat(`c`.`PdcIndexs`,',#',conv(conv(`c`.`ProdCategory_Id`,10,8),8,10),'#' separator ',') AS `PdcIndexs`,`t`.`EnableFlag` AS `EnableFlag`,`t`.`OnlineTime` AS `OnlineTime`,`t`.`SMT_Product_Id` AS `SMT_Product_Id` from (((`ss_product` `t` join `ss_product_res` `a` on((`t`.`SS_Product_Id` = `a`.`SS_Product_Id`))) join `ss_product_seq` `b` on((`t`.`SS_Product_Id` = `b`.`SS_Product_Id`))) left join `salepdcnavigation` `c` on((`b`.`SS_ProdCategory_Id` = `c`.`ProdCategory_Id`))) group by `t`.`SS_Product_Id`,`a`.`LRCode` order by min(((`c`.`Seq` * 10000) + `b`.`Seq`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `supplier_purchaseprod_v`
--

/*!50001 DROP VIEW IF EXISTS `supplier_purchaseprod_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `supplier_purchaseprod_v` AS select `t`.`SkuProduct_Id` AS `SkuProduct_Id`,`t`.`Product_Id` AS `Product_Id`,`t`.`ProdCode` AS `SkuProdCode`,`e`.`ProdName` AS `ProdName`,`e`.`Unit` AS `Unit`,`t`.`PV_Txt` AS `PV_Txt`,`t`.`Cost` AS `Cost`,`d`.`BrowsePicUrl` AS `BrowsePicUrl`,sum(if(`c`.`Qty`,`c`.`Qty`,0)) AS `RequestQty`,sum(if(`h`.`Qty`,`h`.`Qty`,0)) AS `RunningQty`,`e`.`LRCode` AS `LRCode`,`f`.`Seq` AS `Seq`,`t`.`Seq` AS `SkuSeq`,`g`.`Seq` AS `PdcSeq`,`g`.`PdcIndexs` AS `PdcIndexs`,`g`.`ProdCategory_Id` AS `ProdCategory_Id`,`i`.`Supplier_Id` AS `Supplier_Id`,`i`.`QuotedPrice` AS `QuotedPrice` from (((((((`skuproduct` `t` left join `purchaseproduct` `c` on((`t`.`SkuProduct_Id` = `c`.`SkuProduct_Id`))) left join `product_pic` `d` on((`t`.`Product_Pic_Id` = `d`.`Product_Pic_Id`))) left join `product_res` `e` on((`t`.`Product_Id` = `e`.`Product_Id`))) left join `product` `f` on((`t`.`Product_Id` = `f`.`Product_Id`))) left join `prodcategory` `g` on((`f`.`ProdCategory_Id` = `g`.`ProdCategory_Id`))) left join `po_product_running_v` `h` on((`t`.`SkuProduct_Id` = `h`.`SkuProduct_Id`))) left join `purchaseprice` `i` on(((`t`.`SkuProduct_Id` = `i`.`SkuProduct_Id`) and (`i`.`EnableFlag` = 1)))) group by `i`.`Supplier_Id`,`t`.`SkuProduct_Id`,`e`.`LRCode` having (sum(if(`c`.`Qty`,`c`.`Qty`,0)) > sum(if(`h`.`Qty`,`h`.`Qty`,0))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `supplier_v`
--

/*!50001 DROP VIEW IF EXISTS `supplier_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `supplier_v` AS select `t`.`Supplier_Id` AS `Supplier_Id`,`t`.`GlobalArea_Id` AS `GlobalArea_Id`,`t`.`Seq` AS `Seq`,`t`.`S_Email` AS `S_Email`,`t`.`S_WebSite` AS `S_WebSite`,`t`.`S_Tel` AS `S_Tel`,`t`.`S_Fax` AS `S_Fax`,`t`.`EnableFlag` AS `EnableFlag`,`a`.`SuppName` AS `SuppName`,`a`.`S_Remark` AS `S_Remark`,`a`.`S_Address` AS `S_Address`,`a`.`S_ProdRemark` AS `S_ProdRemark`,`a`.`LRCode` AS `LRCode` from (`supplier` `t` left join `supplier_res` `a` on((`t`.`Supplier_Id` = `a`.`Supplier_Id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `sysemail_v`
--

/*!50001 DROP VIEW IF EXISTS `sysemail_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `sysemail_v` AS select `t`.`SysEmail_Id` AS `SysEmail_Id`,`t`.`SaleSite_Id` AS `SaleSite_Id`,`t`.`SaleOrder_Id` AS `SaleOrder_Id`,`t`.`CustEmail` AS `CustEmail`,`t`.`EmailTitle` AS `EmailTitle`,`t`.`EmailType` AS `EmailType`,`t`.`CreateTime` AS `CreateTime`,`t`.`SendTime` AS `SendTime`,`t`.`State` AS `State`,`a`.`CustName` AS `CustName`,`a`.`LRCode` AS `LRCode` from (`sysemail` `t` left join `customer_res` `a` on((`t`.`Customer_Id` = `a`.`Customer_Id`))) where (`t`.`EnableFlag` = 1) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-26 15:47:12
