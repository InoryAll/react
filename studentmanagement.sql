/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 5.7.17-log : Database - studentmanagement
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`studentmanagement` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `studentmanagement`;

/*Table structure for table `course` */

DROP TABLE IF EXISTS `course`;

CREATE TABLE `course` (
  `courseId` varchar(12) NOT NULL COMMENT '课号',
  `courseName` varchar(50) DEFAULT NULL COMMENT '课名',
  `courseKind` varchar(50) DEFAULT NULL COMMENT '课程性质',
  `courseSchedule` int(11) DEFAULT NULL COMMENT '学时',
  `courseCredits` int(11) DEFAULT NULL COMMENT '学分',
  `courseMark` text COMMENT '备注',
  PRIMARY KEY (`courseId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `course` */

insert  into `course`(`courseId`,`courseName`,`courseKind`,`courseSchedule`,`courseCredits`,`courseMark`) values ('000000000001','数据结构','必修',64,4,NULL),('000000000002','数据库系统设计','必修',32,2,NULL),('000000000003','计算机网络','必修',64,3,NULL),('000000000004','计算机组成原理','必修',64,4,NULL),('000000000005','编译原理','选修',32,2,NULL),('000000000006','人工智能','选修',32,2,NULL);

/*Table structure for table `s_c` */

DROP TABLE IF EXISTS `s_c`;

CREATE TABLE `s_c` (
  `stuId` varchar(8) NOT NULL COMMENT '学号',
  `courseId` varchar(12) NOT NULL COMMENT '课号',
  `score` int(11) DEFAULT NULL COMMENT '分数',
  PRIMARY KEY (`stuId`,`courseId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `s_c` */

insert  into `s_c`(`stuId`,`courseId`,`score`) values ('14427006','000000000001',0),('14427006','000000000002',0);

/*Table structure for table `s_t_c` */

DROP TABLE IF EXISTS `s_t_c`;

CREATE TABLE `s_t_c` (
  `teaId` varchar(8) NOT NULL COMMENT '教师号',
  `courseId` varchar(12) NOT NULL COMMENT '课号',
  `stuId` varchar(8) NOT NULL COMMENT '学号',
  `appearance` int(11) DEFAULT NULL COMMENT '教师外表',
  `quality` int(11) DEFAULT NULL COMMENT '教学质量',
  `atmosphere` int(11) DEFAULT NULL COMMENT '课堂氛围',
  `method` int(11) DEFAULT NULL COMMENT '教学方法',
  `attitude` int(11) DEFAULT NULL COMMENT '教学态度',
  `other` text COMMENT '其它',
  PRIMARY KEY (`teaId`,`courseId`,`stuId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `s_t_c` */

insert  into `s_t_c`(`teaId`,`courseId`,`stuId`,`appearance`,`quality`,`atmosphere`,`method`,`attitude`,`other`) values ('14422006','000000000001','14427006',0,0,0,0,0,'null'),('14422006','000000000002','14427006',5,4,5,5,5,'null');

/*Table structure for table `student` */

DROP TABLE IF EXISTS `student`;

CREATE TABLE `student` (
  `stuId` varchar(8) NOT NULL COMMENT '学号',
  `stuPassword` varchar(50) DEFAULT NULL COMMENT '密码',
  `stuName` varchar(50) DEFAULT NULL COMMENT '姓名',
  `stuSex` varchar(4) DEFAULT NULL COMMENT '性别',
  `stuNation` varchar(50) DEFAULT NULL COMMENT '民族',
  `stuAge` int(11) DEFAULT NULL COMMENT '年龄',
  `stuDepartment` varchar(50) DEFAULT NULL COMMENT '专业',
  `stuClass` varchar(50) DEFAULT NULL COMMENT '班级',
  `stuTel` varchar(50) DEFAULT NULL COMMENT '电话',
  `stuMark` text COMMENT '备注',
  PRIMARY KEY (`stuId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `student` */

insert  into `student`(`stuId`,`stuPassword`,`stuName`,`stuSex`,`stuNation`,`stuAge`,`stuDepartment`,`stuClass`,`stuTel`,`stuMark`) values ('14427006','123456','trj','男','汉',23,'软件工程','142','15861368488','null'),('14427008','123456','zsx','男','汉',18,'计算机科学','141','222222','无'),('14427010','123456','lb','男','han',21,'自动化','142','1111111','null'),('14427012','12312','1231','男','13',13,'计算机科学与技术','13','13','null');

/*Table structure for table `t_c` */

DROP TABLE IF EXISTS `t_c`;

CREATE TABLE `t_c` (
  `teaId` varchar(8) NOT NULL COMMENT '教师号',
  `courseId` varchar(12) NOT NULL COMMENT '课程号',
  `detail` text COMMENT '上课时间以及地点,例:周五3-4节，新理308;周四5-6节，新理206;...',
  PRIMARY KEY (`teaId`,`courseId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `t_c` */

insert  into `t_c`(`teaId`,`courseId`,`detail`) values ('14422006','000000000001',NULL),('14422006','000000000002',NULL),('14422008','000000000003',NULL),('14422010','000000000004',NULL),('14422010','000000000005',NULL),('14422010','000000000006',NULL);

/*Table structure for table `teacher` */

DROP TABLE IF EXISTS `teacher`;

CREATE TABLE `teacher` (
  `teaId` varchar(8) NOT NULL COMMENT '教师号',
  `teaPassword` varchar(50) DEFAULT NULL COMMENT '密码',
  `teaName` varchar(50) DEFAULT NULL COMMENT '姓名',
  `teaSex` varchar(4) DEFAULT NULL COMMENT '性别',
  `teaNation` varchar(50) DEFAULT NULL COMMENT '民族',
  `teaAge` int(11) DEFAULT NULL COMMENT '年龄',
  `teaDepartment` varchar(50) DEFAULT NULL COMMENT '专业',
  `teaTel` varchar(50) DEFAULT NULL COMMENT '电话',
  `teaMark` text COMMENT '备注',
  PRIMARY KEY (`teaId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `teacher` */

insert  into `teacher`(`teaId`,`teaPassword`,`teaName`,`teaSex`,`teaNation`,`teaAge`,`teaDepartment`,`teaTel`,`teaMark`) values ('14422006','123456','tjs','女','汉',32,'自动化','78932123','null'),('14422008','123456','bj','男','汉',22,'计算机','2313213',NULL),('14422010','123456','txf','女','汉',21,'物联网','3521321',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
