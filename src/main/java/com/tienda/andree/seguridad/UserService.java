package com.tienda.andree.seguridad;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class UserService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @PreAuthorize("hasRole('admin')")
    public Collection<? extends GrantedAuthority> getAuthorities(UserDetails userDetails) {
        return userDetails.getAuthorities();
    }

    public Authentication login(String user,String password) {
        SecurityContextHolder.clearContext();
        System.out.println("1");
        Authentication result = null;
        System.out.println("2");
        Authentication request = new UsernamePasswordAuthenticationToken(user,password);
        System.out.println("3 "+request);
        result = authenticationManager.authenticate(request);
        System.out.println("4");
        SecurityContextHolder.getContext().setAuthentication(result);
        System.out.println("5");
        System.out.println(result);
        System.out.println("6");
        return result;
    }
}
