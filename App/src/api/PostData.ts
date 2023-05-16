import Axios from "axios";
import { TChatbotSubmission } from "../types/TChatbot";
import { TripDto } from "../types/dto/common/TripDto";
import { SearchQuery, SearchResult } from "../types/Search";
const API_BASE_URL = "http://localhost:3333";
export class PostData {
    public async postSubmission(submissions: TChatbotSubmission[]) {
        return (await Axios.post<TripDto>(`${API_BASE_URL}/submissions`, submissions)).data;
    }
    public async search(searchQuery: SearchQuery) {
        return await Axios.post<SearchResult>(`${API_BASE_URL}/search`, searchQuery);
    }
}
export const postData = new PostData();
