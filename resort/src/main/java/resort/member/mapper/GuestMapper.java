package resort.member.mapper;

import org.apache.ibatis.annotations.Mapper;

import resort.member.dto.GuestDTO;

@Mapper
public interface GuestMapper {

	// 비회원 insert
	public void insertGuest(GuestDTO gdto);
}
