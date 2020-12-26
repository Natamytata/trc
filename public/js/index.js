const getFeedbackList = () => {
    const feedbackListLink = '/feedbackList'; 
    return fetch(feedbackListLink).
        then(res => res.text()).
        then(feedbackList => updateFeedbackList(feedbackList)); 
} 

const updateFeedbackList = (feedbackList) => {
    console.log(feedbackList);
}

const getWorkingTime = () => {
    const workingTimeLink = '/workingTime'; 
    return fetch(workingTimeLink).
        then(res => res.text()).
        then(workingTime => updateWorkingTime(workingTime));
}

const updateWorkingTime = (workingTime) => {
    console.log(workingTime);
}
