import buildAuthHeader from './auth-header';
import _ from "lodash";

export default class RestApiService {

    _apiBase = 'http://localhost:8080';

    async processRequest(url, payload, withResponseBody) {
        let response;
        if (payload) {
            response = await fetch(`${this._apiBase}${url}`, payload);
        } else {
            response = await fetch(`${this._apiBase}${url}`);
        }

        if (!response.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${response.status}`)
        }

        return withResponseBody ? await response.json() : response;
    }

    processAuthorizedRequest(url, requestPayload, token, withResponseBody) {
        const {headers, ...otherPayloadProps} = requestPayload;
        const requestPayloadWithInjectedAuthToken = {
            headers: {
                ...buildAuthHeader(token),
                ...headers
            },
            ...otherPayloadProps
        };
        return this.processRequest(url, requestPayloadWithInjectedAuthToken, withResponseBody);
    }

    processLogin(email, password) {
        const requestPayload = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: email, password: password})
        };
        return this.processRequest("/account/login", requestPayload, true);
    }

    processRegistration(name, email, password) {
        const requestPayload = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: name, email: email, password: password})
        };
        return this.processRequest("/account/registration", requestPayload, true);
    }

    processRecovery({email}) {
        const requestPayload = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: email})
        };
        return this.processRequest("/account/recovery", requestPayload, true);
    }

    resetChapterProgress(bundleId) {
        const token = localStorage.getItem("token");
        const requestPayload = {
            method: "POST",
            headers: {"Content-Type": "application/json"}
        };
        return this.processAuthorizedRequest(`/sandbox/bundle/${bundleId}/reset`, requestPayload, token, true);
    }

    checkChapterAnswer(chapterId) {
        const token = localStorage.getItem("token");
        const requestPayload = {
            method: "POST",
            headers: {"Content-Type": "application/json"}
        };
        return this.processAuthorizedRequest(`/sandbox/chapter/${chapterId}/check`, requestPayload, token, true);
    }

    updateEditorContent(bundleId, content, type) {
        return this._updateEditorContentThrottle(bundleId, content, type);
    }

    _updateEditorContentThrottle = _.throttle(this._updateEditorContentThrottleFunction, 750);

    _updateEditorContentThrottleFunction(bundleId, content, type) {
        const token = localStorage.getItem("token");
        const requestPayload = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({content, type})
        };
        return this.processAuthorizedRequest(`/sandbox/bundle/${bundleId}`, requestPayload, token, false);
    }

    getLesson(courseId, lessonId) {
        const token = localStorage.getItem("token");
        const requestPayload = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return this.processAuthorizedRequest(`/courses/${courseId}/lessons/${lessonId}`, requestPayload, token, true);
    }

    getCourse(courseId) {
        const token = localStorage.getItem("token");
        const requestPayload = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return this.processAuthorizedRequest(`/courses/${courseId}`, requestPayload, token, true);
    }

    getAllCourses() {
        const token = localStorage.getItem("token");
        const requestPayload = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return this.processAuthorizedRequest("/courses", requestPayload, token, true);
    }

    getAllCoursesForManagement() {
        const token = localStorage.getItem("token");
        const requestPayload = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return this.processAuthorizedRequest(`/management/courses`, requestPayload, token, true);
    }

    getAllTopicsByCourseIdForManagement(courseId) {
        const token = localStorage.getItem("token");
        const requestPayload = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return this.processAuthorizedRequest(`/management/courses/${courseId}/topics`, requestPayload, token, true);
    }

    createTopicByCourseIdForManagement(courseId, title, orderIndex) {
        const token = localStorage.getItem("token");
        const requestPayload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, orderIndex})
        };
        return this.processAuthorizedRequest(`/management/courses/${courseId}/topics`, requestPayload, token, true);
    }

    deleteTopicByIdForManagement(courseId, topicId) {
        const token = localStorage.getItem("token");
        const requestPayload = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return this.processAuthorizedRequest(`/management/courses/${courseId}/topics/${topicId}`, requestPayload, token, true);
    }

    getAllLessonByTopicIdForManagement(topicId) {
        const token = localStorage.getItem("token");
        const requestPayload = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        return this.processAuthorizedRequest(`/management/topics/${topicId}/lessons`, requestPayload, token, true);
    }

    createLessonByTopicIdForManagement(topicId, title, description, orderIndex) {
        const token = localStorage.getItem("token");
        const requestPayload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, description, orderIndex})
        };
        return this.processAuthorizedRequest(`/management/topics/${topicId}/lessons`, requestPayload, token, true);
    }

    deleteLessonByIdForManagement(topicId, lessonId) {
        const token = localStorage.getItem("token");
        const requestPayload = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return this.processAuthorizedRequest(`/management/topics/${topicId}/lessons/${lessonId}`, requestPayload, token, true);
    }

    getAllChaptersByLessonIdForManagement(lessonId) {
        const token = localStorage.getItem("token");
        const requestPayload = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        return this.processAuthorizedRequest(`/management/lessons/${lessonId}/chapters`, requestPayload, token, true);
    }

    createChapterByLessonIdForManagement(lessonId, description, orderIndex, htmlContent, cssContent, jsContent) {
        const token = localStorage.getItem("token");
        const requestPayload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({description, orderIndex, htmlContent, cssContent, jsContent})
        };
        return this.processAuthorizedRequest(`/management/lessons/${lessonId}/chapters`, requestPayload, token, true);
    }

    deleteChapterByIdForManagement(lessonId, chapterId) {
        const token = localStorage.getItem("token");
        const requestPayload = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return this.processAuthorizedRequest(`/management/lessons/${lessonId}/chapters/${chapterId}`, requestPayload, token, true);
    }

    getAllRulesByChapterIdForManagement(chapterId) {
        const token = localStorage.getItem("token");
        const requestPayload = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        return this.processAuthorizedRequest(`/management/chapters/${chapterId}/rules`, requestPayload, token, true);
    }

    createRuleByChapterIdForManagement(chapterId, payload) {
        const token = localStorage.getItem("token");
        const requestPayload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...payload})
        };
        return this.processAuthorizedRequest(`/management/chapters/${chapterId}/rules`, requestPayload, token, true);
    }

    deleteRuleByIdForManagement(chapterId, ruleId) {
        const token = localStorage.getItem("token");
        const requestPayload = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return this.processAuthorizedRequest(`/management/chapters/${chapterId}/rules/${ruleId}`, requestPayload, token, true);
    }

    moveToNextChapter(courseId) {
        const token = localStorage.getItem("token");
        const requestPayload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return this.processAuthorizedRequest(`/courses/${courseId}/progress/next`, requestPayload, token, false);
    }
}

