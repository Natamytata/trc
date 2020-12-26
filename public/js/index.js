const getFeedbackList = () => {
    const feedbackListLink = '/feedbackList'; 
    return fetch(feedbackListLink).
        then(res => res.text()).
        then(feedbackList => updateFeedbackList(feedbackList)); 
} 

const updateFeedbackList = (feedbackList) => {
    feedbackList = JSON.parse(feedbackList);
    feedbackList.forEach(feedback => {
        console.log(feedback);
        $('#feedback').append(`
            <div class="feedback_item">
                <p>${feedback.email}</p>
                <p>${feedback.feedback}</p>
            </div>
        `)
    });
}

const getWorkingTime = () => {
    const workingTimeLink = '/workingTime'; 
    return fetch(workingTimeLink).
        then(res => res.text()).
        then(workingTime => updateWorkingTime(workingTime));
}

const updateWorkingTime = (workingTime) => {
    workingTime = JSON.parse(workingTime).workingTime;
    Object.keys(workingTime).forEach(day => {
        const timeOfDay = workingTime[day];
        console.log(day, ' : ', timeOfDay);
    })
}
