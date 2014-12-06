package com.tienda.andree.seguridad;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Collection;

@Controller
public class ApplicationController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index(ModelMap map) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails =
                    (UserDetails) authentication.getPrincipal();
            map.addAttribute("userDetails", userDetails);
        }
        return "index";
    }

    @PreAuthorize("hasRole('admin')")
    @RequestMapping(value = "/andree", method = RequestMethod.GET)
    public String admin(ModelMap map) {
        UserDetails userDetails =
                (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Collection<? extends GrantedAuthority> securedMessage = userService.getAuthorities(userDetails);
        map.addAttribute("userDetails", userDetails);
        map.addAttribute("userAuthorities", securedMessage);
        return "andree";
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login( String user,String password, ModelMap model, final HttpServletRequest request)
            throws IOException, JSONException {
        System.out.println("user "+user+"-"+password);
        Authentication result = userService.login(user, password);
        if (result.isAuthenticated()){
            return "redirect:/andree";
        }else{
            return "redirect:/";
        }

    }
}