package com.entity;
/*课程实体类*/
public class Course {
	private String courseId;
	private String courseName;
	private String courseKind;
	private int courseSchedule;
	private int courseCredits;
	private String courseMark;
	
	public String getCourseId() {
		return courseId;
	}
	public void setCourseId(String courseId) {
		this.courseId = courseId;
	}
	public String getCourseName() {
		return courseName;
	}
	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}
	public String getCourseKind() {
		return courseKind;
	}
	public void setCourseKind(String courseKind) {
		this.courseKind = courseKind;
	}
	public int getCourseSchedule() {
		return courseSchedule;
	}
	public void setCourseSchedule(int courseSchedule) {
		this.courseSchedule = courseSchedule;
	}
	public int getCourseCredits() {
		return courseCredits;
	}
	public void setCourseCredits(int courseCredits) {
		this.courseCredits = courseCredits;
	}
	public String getCourseMark() {
		return courseMark;
	}
	public void setCourseMark(String courseMark) {
		this.courseMark = courseMark;
	}
	
}
