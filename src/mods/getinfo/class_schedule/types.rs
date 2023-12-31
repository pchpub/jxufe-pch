// 上课班号
// 课程
// 总学时
// 学分
// 修读性质
// 任课教师
// 选课状态
// 教材
// 上课时间地点
// 备注
#[derive(Debug)]
pub struct SingleClassSchedule {
    pub class_num: String,
    pub class_name: String,
    pub total_time: String,
    pub credit: String,
    pub nature: String,
    pub teacher: String,
    pub status: String,
    pub textbook: String,
    pub time_place: String,
    pub remark: String,
}

impl SingleClassSchedule {
    pub fn new() -> Self {
        Self {
            class_num: String::new(),
            class_name: String::new(),
            total_time: String::new(),
            credit: String::new(),
            nature: String::new(),
            teacher: String::new(),
            status: String::new(),
            textbook: String::new(),
            time_place: String::new(),
            remark: String::new(),
        }
    }
}

#[derive(Debug)]
pub struct FormatedSingleClassSchedule {
    pub class_num: String,
    pub class_name: String,
    pub teacher: String,
    pub time: String,
    pub place: String,
    // pub time_place: String,
    // pub remark: String,
}

impl FormatedSingleClassSchedule {
    pub fn new(class_num: &str, class_name: &str, teacher: &str, time: &str, place: &str) -> Self {
        Self {
            class_num: class_num.to_owned(),
            class_name: class_name.to_owned(),
            teacher: teacher.to_owned(),
            time: time.to_owned(),
            place: place.to_owned(),
        }
    }
}

// impl From<SingleClassSchedule> for FormatedSingleClassSchedule {
//     fn from(item: SingleClassSchedule) -> Self {
//         let time_place = item.time_place;
//         let time_place: Vec<&str> = time_place.split(",");
        
// }

pub struct ClassScheduleInfo {
    pub student_id: String,
    pub student_name: String,
    pub class_name: String,
    pub class_num: String,
    sheet: Vec<SingleClassSchedule>,
    // pub class_schedule: Option<Vec<SingleClassSchedule>>,
}

impl ClassScheduleInfo {
    pub fn new(
        student_id: &str,
        student_name: &str,
        class_name: &str,
        class_num: &str,
        sheet: Vec<SingleClassSchedule>,
    ) -> Self {
        Self {
            student_id: student_id.to_owned(),
            student_name: student_name.to_owned(),
            class_name: class_name.to_owned(),
            class_num: class_num.to_owned(),
            sheet: sheet,
        }
    }

    pub fn print(&self) {
        println!("学号: {}", self.student_id);
        println!("姓名: {}", self.student_name);
        println!("班级: {}", self.class_name);
        println!("课程数: {}", self.class_num);
        println!("");
        println!("课程表:");
        println!("----------------------------------------");
        for item in &self.sheet {
            println!("上课班号: {}", item.class_num);
            println!("课程: {}", item.class_name);
            println!("总学时: {}", item.total_time);
            println!("学分: {}", item.credit);
            println!("修读性质: {}", item.nature);
            println!("任课教师: {}", item.teacher);
            println!("选课状态: {}", item.status);
            println!("教材: {}", item.textbook);
            println!("上课时间地点: {}", item.time_place);
            println!("备注: {}", item.remark);
            println!();
        }
    }
}

