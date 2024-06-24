package com.sophra.chungmusic;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebContorller {

    @RequestMapping(value = {"/", "/error"})
    public String forward() {
        return "forward:/index.html";
    }
    
}
