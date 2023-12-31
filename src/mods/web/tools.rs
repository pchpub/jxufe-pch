use qstring::QString;

pub async fn remove_querys(query: &str, element: &Vec<&str>) -> String {
    let query: QString = QString::from(query);
    let query_vec: Vec<(String, String)> = query
        .into_pairs()
        .into_iter()
        .filter(|value| !element.contains(&value.0.as_str()))
        .collect();
    if query_vec.len() == 0 {
        return "".to_owned();
    }
    let new_query: QString = QString::new(query_vec);
    new_query.to_string()
}
